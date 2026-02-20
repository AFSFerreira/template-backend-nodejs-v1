import type { ICopyFile } from '@custom-types/services/files/copy-file'
import type { FileInfo } from '@custom-types/services/files/file-info'
import path from 'node:path'
import { logError } from '@lib/pino/helpers/log-error'
import { DIRECTORY_NOT_FOUND_ERROR } from '@messages/loggings/system/file-loggings'
import { HashService } from '@services/hashes/hash-service'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import { deleteFile } from '@utils/files/delete-file'
import fs, { ensureDir } from 'fs-extra'

export async function copyFile({
  sourceFilePath,
  newFilename,
  destinationFolderPath,
  buildShard,
}: ICopyFile): Promise<FileInfo> {
  const filename = `${newFilename ?? HashService.generateFileHash()}${path.extname(sourceFilePath)}`
  const fileFolderShard = buildShard ? buildShardFileFolder(filename) : ''
  const finalFilePath = path.resolve(destinationFolderPath, fileFolderShard, filename)

  const partialReturnData = { finalFilePath, filename }

  try {
    await ensureDir(path.join(destinationFolderPath, fileFolderShard))
  } catch (error) {
    logError({ error, message: DIRECTORY_NOT_FOUND_ERROR })

    return { ...partialReturnData, success: false }
  }

  try {
    await fs.copyFile(sourceFilePath, finalFilePath)

    return { ...partialReturnData, success: true }
  } catch (_error) {
    await deleteFile(finalFilePath)

    return { ...partialReturnData, success: false }
  }
}
