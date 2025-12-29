import type { ICopyFile } from '@custom-types/services/copy-file'
import type { FileInfo } from '@custom-types/services/file-info'
import path from 'node:path'
import { deleteFile } from '@utils/files/delete-file'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import fs from 'fs-extra'

export async function copyFile({ sourceFilePath, newFilename, destinationFolderPath }: ICopyFile): Promise<FileInfo> {
  const filename = `${newFilename ?? generateFileHash()}${path.extname(sourceFilePath)}`
  const finalFilePath = path.resolve(destinationFolderPath, filename)

  const partialReturnData = { finalFilePath, filename }

  try {
    await fs.copyFile(sourceFilePath, finalFilePath)

    return { ...partialReturnData, success: true }
  } catch (_error) {
    await deleteFile(finalFilePath)

    return { ...partialReturnData, success: false }
  }
}
