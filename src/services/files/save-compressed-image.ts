import type { CompressedImageInfo } from '@custom-types/services/files/compressed-image-info'
import type { SaveCompressedImage } from '@custom-types/services/files/save-compressed-image'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { logError } from '@lib/pino/helpers/log-error'
import { DIRECTORY_NOT_FOUND_ERROR } from '@messages/loggings/system/file-loggings'
import { CreateFileWriteSteam } from '@services/files/create-file-write-steam'
import { deleteFile } from '@services/files/delete-file'
import { fileExists } from '@services/files/file-exists'
import { HashService } from '@services/hashes/hash-service'
import { FileSaveError } from '@use-cases/errors/generic/file-save-error'
import { ensureDir } from 'fs-extra'
import sharp from 'sharp'

/**
 * Salva uma imagem comprimida no formato WebP via sharp.
 *
 * Gera nome único com extensão `.webp`, verifica duplicidade,
 * e aplica resize + compressão WebP com dimensões e qualidade configuráveis.
 * Remove arquivo parcial em caso de falha.
 *
 * @param filePart - Parte do multipart com o stream da imagem.
 * @param folderPath - Diretório de destino.
 * @param options - Dimensões (padrão: 192x192) e qualidade (padrão: 70).
 * @returns Informações do arquivo salvo com flag `success`.
 */
export async function saveCompressedImage({
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
  const finalName = `${HashService.generateFileId()}.webp`

  const finalImagePath = path.resolve(folderPath, finalName)

  const partialReturnData = { finalImagePath, filename: finalName }

  const fileAreadyExists = await fileExists(finalImagePath)

  // O arquivo já foi persistido anteriormente:
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
