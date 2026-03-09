import type { FileInfo } from '@custom-types/services/files/file-info'
import type { ISaveMultipartFile } from '@custom-types/services/files/save-document'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { logError } from '@lib/pino/helpers/log-error'
import { DIRECTORY_NOT_FOUND_ERROR, SAVE_MULTIPART_FILE_ERROR } from '@messages/loggings/system/file-loggings'
import { CreateFileWriteSteam } from '@services/files/create-file-write-steam'
import { deleteFile } from '@services/files/delete-file'
import { fileExists } from '@services/files/file-exists'
import { renameFile } from '@services/files/rename-file'
import { HashService } from '@services/hashes/hash-service'
import { FileSaveError } from '@use-cases/errors/generic/file-save-error'
import { getFileExtension } from '@utils/files/get-file-extension'
import { ensureDir } from 'fs-extra'

export async function saveFile({ filePart, baseFolder, newFilename }: ISaveMultipartFile): Promise<FileInfo> {
  const filename = `${newFilename ?? `${HashService.generateFileId()}.${getFileExtension(filePart.filename)}`}`

  const baseFolderPath = path.resolve(baseFolder)
  const finalFilePath = path.resolve(baseFolderPath, filename)

  const partialReturnData = { finalFilePath, filename }

  const fileAreadyExists = await fileExists(finalFilePath)

  // O arquivo já foi persistido anteriormente:
  if (fileAreadyExists) {
    return { ...partialReturnData, success: true }
  }

  try {
    await ensureDir(baseFolderPath)
  } catch (error) {
    logError({ error, message: DIRECTORY_NOT_FOUND_ERROR })

    return { ...partialReturnData, success: false }
  }

  // NOTE: Cria um arquivo temporário auxiliar para não corromper
  // o original ao sobrescrever diretamente caso ocorra uma falha ou
  // a stream estoure o limite de tamanho durante a escrita:
  const tempFileName = `temp-${HashService.generateFileId()}`
  const tempFilePath = path.resolve(baseFolderPath, tempFileName)

  try {
    const writeStream = await CreateFileWriteSteam(tempFilePath)

    await pipeline(filePart.file, writeStream)

    if (filePart.file.truncated) {
      throw new FileSaveError()
    }

    // Persiste o arquivo temporário final:
    const renamed = await renameFile(tempFilePath, finalFilePath)

    if (!renamed) {
      throw new FileSaveError()
    }
  } catch (error) {
    logError({ error, context: { filename, baseFolder }, message: SAVE_MULTIPART_FILE_ERROR })

    // Tenta remover o arquivo temporario persistido:
    await deleteFile(tempFilePath)

    return { ...partialReturnData, success: false }
  }

  return { ...partialReturnData, success: true }
}
