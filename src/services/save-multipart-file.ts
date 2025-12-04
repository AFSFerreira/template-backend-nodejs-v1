import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import type { ISaveMultipartFile } from '@custom-types/custom/save-document'
import { logError } from '@lib/logger/helpers/log-error'
import { SAVE_MULTIPART_FILE_ERROR } from '@messages/loggings'
import fs from 'fs-extra'

export async function saveMultipartFile({
  filePart,
  baseFolder,
  filename,
}: ISaveMultipartFile): Promise<string | null> {
  const baseFolderPath = path.resolve(baseFolder)
  const newFilePath = path.join(baseFolderPath, filename)

  const tempFileName = `temp-${crypto.randomUUID()}-${filename}`
  const tempFilePath = path.join(baseFolderPath, tempFileName)

  await fs.ensureDir(baseFolderPath)

  const writeStream = fs.createWriteStream(tempFilePath)

  try {
    await pipeline(filePart.file, writeStream)

    if (filePart.file.truncated) return null

    await fs.move(tempFilePath, newFilePath, { overwrite: true })
  } catch (error: unknown) {
    logError({ error, context: { filename, baseFolder }, message: SAVE_MULTIPART_FILE_ERROR })
    return null
  } finally {
    writeStream.close()
    await fs.unlink(tempFilePath).catch(() => {})
  }

  return newFilePath
}
