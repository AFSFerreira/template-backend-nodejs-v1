import type { ImageInfo } from '@custom-types/services/files/image-info'
import type { ISaveAvifImage } from '@custom-types/services/files/save-avif-image'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { logError } from '@lib/pino/helpers/log-error'
import { DIRECTORY_NOT_FOUND_ERROR } from '@messages/loggings/system/file-loggings'
import { deleteFile } from '@services/files/delete-file'
import { fileExists } from '@services/files/file-exists'
import { HashService } from '@services/hashes/hash-service'
import { FileSaveError } from '@use-cases/errors/generic/file-save-error'
import { mapQualityToDimensions } from '@utils/mappers/map-ratio-and-quality-dimensions'
import { ensureDir } from 'fs-extra'
import sharp from 'sharp'

/**
 * Salva uma imagem no formato AVIF com compressão via sharp.
 *
 * Fluxo:
 * 1. Gera nome único (ou usa `newFilename`) com extensão `.avif`.
 * 2. Verifica se o arquivo já existe (idempotente).
 * 3. Cria diretório de destino se necessário.
 * 4. Processa o stream com sharp (resize + encode AVIF).
 * 5. Persiste via pipeline stream → sharp → writeStream.
 * 6. Em caso de falha, remove arquivo parcial.
 *
 * @param filePart - Parte do multipart contendo o stream da imagem.
 * @param newFilename - Nome do arquivo sem extensão (opcional; gera UUID se não informado).
 * @param folderPath - Diretório de destino.
 * @param options - Opções de dimensões e qualidade AVIF.
 * @returns Informações do arquivo salvo com flag `success`.
 */
export async function saveAvifImage({
  filePart,
  newFilename,
  folderPath,
  options,
}: ISaveAvifImage): Promise<ImageInfo> {
  const filename = `${newFilename ?? HashService.generateFileId()}.avif`
  const finalImagePath = path.resolve(folderPath, filename)

  const partialReturnData = { finalImagePath, filename }

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
