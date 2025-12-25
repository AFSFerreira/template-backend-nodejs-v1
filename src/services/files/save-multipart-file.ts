import type { ISaveMultipartFile } from '@custom-types/custom/save-document'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { logError } from '@lib/logger/helpers/log-error'
import { SAVE_MULTIPART_FILE_ERROR } from '@messages/loggings/file-loggings'
import { deleteFile } from '@utils/files/delete-file'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import fs from 'fs-extra'

export async function saveMultipartFile({
  filePart,
  baseFolder,
  filename,
}: ISaveMultipartFile): Promise<string | null> {
  const baseFolderPath = path.resolve(baseFolder)
  const newFilePath = path.join(baseFolderPath, filename)

  // Cria um arquivo temporário auxiliar:
  const tempFileName = `temp-${generateFileHash()}`
  const tempFilePath = path.resolve(baseFolderPath, tempFileName)

  await fs.ensureDir(baseFolderPath)

  const writeStream = fs.createWriteStream(tempFilePath)

  try {
    await pipeline(filePart.file, writeStream)

    if (filePart.file.truncated) return null

    // Persiste o arquivo temporário final:
    await fs.move(tempFilePath, newFilePath, { overwrite: true })
  } catch (error: unknown) {
    logError({ error, context: { filename, baseFolder }, message: SAVE_MULTIPART_FILE_ERROR })

    return null
  } finally {
    // Tenta remover o arquivo temporario persistido:
    await deleteFile(tempFilePath)
  }

  return newFilePath
}
