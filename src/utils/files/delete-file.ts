import { logError } from '@lib/logger/helpers/log-error'
import { FILE_DELETION_ERROR } from '@messages/loggings/file-loggings'
import fs from 'fs-extra'

export async function deleteFile(filePath: string) {
  try {
    await fs.unlink(filePath)
    return true
  } catch (error) {
    logError({ error, context: { filePath }, message: FILE_DELETION_ERROR })
    return false
  }
}
