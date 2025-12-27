import type { ICopyFile } from '@custom-types/services/copy-file'
import type { FileInfo } from '@custom-types/services/file-info'
import fs from 'node:fs/promises'
import path from 'node:path'
import { deleteFile } from '@utils/files/delete-file'
import { generateFileHash } from '@utils/tokens/generate-file-hash'

export async function copyFile({ sourceFilePath, destinationFolderPath }: ICopyFile): Promise<FileInfo> {
  const filename = `${generateFileHash()}${path.extname(sourceFilePath)}`
  const finalFilePath = path.resolve(destinationFolderPath, filename)

  try {
    await fs.copyFile(sourceFilePath, finalFilePath)

    return { finalFilePath, filename, success: true }
  } catch (_error) {
    await deleteFile(finalFilePath)

    return { finalFilePath, filename, success: false }
  }
}
