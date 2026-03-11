import type { ImagePathInfo } from '@custom-types/custom/image-path-info'
import type { CompressedImageInfo } from '@custom-types/services/files/compressed-image-info'
import type { ICopyFile } from '@custom-types/services/files/copy-file'
import type { FileInfo } from '@custom-types/services/files/file-info'
import type { ImageInfo } from '@custom-types/services/files/image-info'
import type { ISaveAvifImage } from '@custom-types/services/files/save-avif-image'
import type { SaveCompressedImage } from '@custom-types/services/files/save-compressed-image'
import type { ISaveMultipartFile } from '@custom-types/services/files/save-document'
import type { IswapFiles } from '@custom-types/services/files/swap-multipart-files'
import { createWriteStream } from 'node:fs'
import { glob } from 'node:fs/promises'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logError } from '@lib/pino/helpers/log-error'
import {
  DIRECTORY_NOT_FOUND_ERROR,
  SAVE_MULTIPART_FILE_ERROR,
  SWAP_FILE_LOOP_ERROR,
} from '@messages/loggings/system/file-loggings'
import { CreateFileWriteSteam } from '@services/files/create-file-write-steam'
import { deleteFile } from '@services/files/delete-file'
import { fileExists } from '@services/files/file-exists'
import { renameFile } from '@services/files/rename-file'
import { HashService } from '@services/hashes/hash-service'
import { FileSaveError } from '@use-cases/errors/generic/file-save-error'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import { getFileExtension } from '@utils/files/get-file-extension'
import { mapQualityToDimensions } from '@utils/mappers/map-ratio-and-quality-dimensions'
import fs, { ensureDir } from 'fs-extra'
import sharp from 'sharp'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FileService {
  constructor(
    @inject(HashService)
    private readonly hashService: HashService,
  ) {}

  async saveAvifImage({ filePart, newFilename, folderPath, options }: ISaveAvifImage): Promise<ImageInfo> {
    const filename = `${newFilename ?? this.hashService.generateFileId()}.avif`
    const finalImagePath = path.resolve(folderPath, filename)

    const partialReturnData = { finalImagePath, filename }

    const fileAreadyExists = await fileExists(finalImagePath)

    if (fileAreadyExists) {
      return { ...partialReturnData, success: true }
    }

    try {
      await ensureDir(folderPath)
    } catch (error) {
      logError({ error, message: DIRECTORY_NOT_FOUND_ERROR })

      return { ...partialReturnData, success: false }
    }

    const sharpStream = sharp()
      .resize({
        ...(options?.dimensions ? mapQualityToDimensions(options.dimensions) : {}),
        fit: 'fill',
        kernel: 'lanczos3',
      })
      .avif({
        effort: 3,
        quality: options?.specs?.quality ?? 80,
        chromaSubsampling: options?.specs?.chromaSubsampling ?? '4:4:4',
        lossless: false,
      })

    try {
      const destinationStream = createWriteStream(finalImagePath)

      await pipeline(filePart.file, sharpStream, destinationStream)

      if (filePart.file.truncated) {
        throw new FileSaveError()
      }

      return { ...partialReturnData, success: true }
    } catch (_error) {
      await deleteFile(finalImagePath)

      return { ...partialReturnData, success: false }
    }
  }

  async saveFile({ filePart, baseFolder, newFilename }: ISaveMultipartFile): Promise<FileInfo> {
    const filename = `${newFilename ?? `${this.hashService.generateFileId()}.${getFileExtension(filePart.filename)}`}`

    const baseFolderPath = path.resolve(baseFolder)
    const finalFilePath = path.resolve(baseFolderPath, filename)

    const partialReturnData = { finalFilePath, filename }

    const fileAreadyExists = await fileExists(finalFilePath)

    if (fileAreadyExists) {
      return { ...partialReturnData, success: true }
    }

    try {
      await ensureDir(baseFolderPath)
    } catch (error) {
      logError({ error, message: DIRECTORY_NOT_FOUND_ERROR })

      return { ...partialReturnData, success: false }
    }

    const tempFileName = `temp-${this.hashService.generateFileId()}`
    const tempFilePath = path.resolve(baseFolderPath, tempFileName)

    try {
      const writeStream = await CreateFileWriteSteam(tempFilePath)

      await pipeline(filePart.file, writeStream)

      if (filePart.file.truncated) {
        throw new FileSaveError()
      }

      const renamed = await renameFile(tempFilePath, finalFilePath)

      if (!renamed) {
        throw new FileSaveError()
      }
    } catch (error) {
      logError({ error, context: { filename, baseFolder }, message: SAVE_MULTIPART_FILE_ERROR })

      await deleteFile(tempFilePath)

      return { ...partialReturnData, success: false }
    }

    return { ...partialReturnData, success: true }
  }

  async saveCompressedImage({
    filePart,
    folderPath,
    options = {
      dimensions: {
        width: 192,
        height: 192,
      },
      quality: 70,
    },
  }: SaveCompressedImage): Promise<CompressedImageInfo> {
    const finalName = `${this.hashService.generateFileId()}.webp`

    const finalImagePath = path.resolve(folderPath, finalName)

    const partialReturnData = { finalImagePath, filename: finalName }

    const fileAreadyExists = await fileExists(finalImagePath)

    if (fileAreadyExists) {
      return { ...partialReturnData, success: true }
    }

    try {
      await ensureDir(folderPath)
    } catch (error) {
      logError({ error, message: DIRECTORY_NOT_FOUND_ERROR })

      return { ...partialReturnData, success: false }
    }

    const sharpStream = sharp().resize(options.dimensions).webp({ quality: options.quality })

    try {
      const destinationStream = await CreateFileWriteSteam(finalImagePath)

      await pipeline(filePart.file, sharpStream, destinationStream)

      if (filePart.file.truncated) {
        throw new FileSaveError()
      }

      return { ...partialReturnData, success: true }
    } catch (_error) {
      await deleteFile(finalImagePath)

      return { ...partialReturnData, success: false }
    }
  }

  async swapFiles(files: IswapFiles[]) {
    for (const file of files) {
      const { anyExtension, ...filteredFileInfo } = file
      const { filename, finalFilePath, success } = await this.saveFile({
        ...filteredFileInfo,
        newFilename: file.filename,
      })

      const partialReturnData = { filename, finalFilePath }

      if (!success) return { ...partialReturnData, success: false }

      if (!file.anyExtension) continue

      try {
        const filePattern = path.resolve(file.baseFolder, `${path.parse(file.filename).name}*`)

        const files = await Array.fromAsync(glob(filePattern))

        const deletePromises = files
          .filter((file) => path.resolve(finalFilePath) !== path.resolve(file))
          .map((file) => deleteFile(file))

        await Promise.all(deletePromises)
      } catch (error) {
        logError({ error, context: { file }, message: SWAP_FILE_LOOP_ERROR })

        return false
      }
    }

    return true
  }

  async copyFile({ sourceFilePath, newFilename, destinationFolderPath, buildShard }: ICopyFile): Promise<FileInfo> {
    const filename = `${newFilename ?? this.hashService.generateFileId()}.${getFileExtension(sourceFilePath)}`
    const fileFolderShard = buildShard ? buildShardFileFolder(filename) : ''
    const finalFilePath = path.resolve(destinationFolderPath, fileFolderShard, filename)

    const partialReturnData = { finalFilePath, filename }

    const failedResponse = { ...partialReturnData, success: false }

    if (!fileExists(sourceFilePath)) {
      return failedResponse
    }

    try {
      await ensureDir(path.join(destinationFolderPath, fileFolderShard))
    } catch (error) {
      logError({ error, message: DIRECTORY_NOT_FOUND_ERROR })

      return failedResponse
    }

    try {
      await fs.copyFile(sourceFilePath, finalFilePath)

      return { ...partialReturnData, success: true }
    } catch (_error) {
      await deleteFile(finalFilePath)

      return failedResponse
    }
  }

  async moveFilesIfNotExists(input: ImagePathInfo | ImagePathInfo[]) {
    if (Array.isArray(input)) {
      for (const item of input) {
        await this.moveFilesIfNotExists(item)
      }
      return
    }

    const alreadyExists = await fileExists(input.newFilePath)

    if (alreadyExists) return

    await moveFileEnqueued(input)
  }
}
