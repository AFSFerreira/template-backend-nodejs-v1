import type { FileInfo } from '@custom-types/services/file-info'
import type { SaveFileInput } from '@custom-types/services/save-file'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { deleteFile } from '@utils/files/delete-file'
import { generateFileHash } from '@utils/tokens/generate-file-hash'

export async function saveFile({ fileStream, folderPath, originalFilename }: SaveFileInput): Promise<FileInfo> {
  const filename = `${generateFileHash()}${path.extname(originalFilename)}`

  const finalFilePath = path.resolve(folderPath, filename)

  const destinationStream = createWriteStream(finalFilePath)

  try {
    await pipeline(fileStream, destinationStream)

    return { finalFilePath, filename, success: true }
  } catch (_error) {
    await deleteFile(finalFilePath)

    return { finalFilePath, filename, success: false }
  }
}
