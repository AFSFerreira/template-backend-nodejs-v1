import type { FileInfo } from '@custom-types/services/file-info'
import type { SaveFileInput } from '@custom-types/services/save-file'
import crypto from 'node:crypto'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { deleteFile } from '@utils/files/delete-file'

export async function saveFile({ fileStream, folderPath, originalFilename }: SaveFileInput): Promise<FileInfo> {
  const fileNameHash = crypto.randomBytes(10).toString('hex')
  const timestamp = Date.now()
  const fileName = `${fileNameHash}-${timestamp}${path.extname(originalFilename)}`

  const finalFilePath = path.resolve(folderPath, fileName)

  const destinationStream = createWriteStream(finalFilePath)

  try {
    await pipeline(fileStream, destinationStream)
    return { finalFilePath, fileName, success: true }
  } catch (_error) {
    await deleteFile(finalFilePath)
    return { finalFilePath, fileName, success: false }
  } finally {
    destinationStream.close()
  }
}
