import { logError } from '@lib/logger/helpers/log-error'
import { FILE_RENAME_ERROR } from '@messages/loggings/system/file-loggings'
import fs from 'fs-extra'

export async function renameFile(oldPath: string, newPath: string): Promise<boolean> {
  try {
    await fs.rename(oldPath, newPath)
    return true
  } catch (error) {
    logError({ error, context: { oldPath, newPath }, message: FILE_RENAME_ERROR })
    return false
  }
}
