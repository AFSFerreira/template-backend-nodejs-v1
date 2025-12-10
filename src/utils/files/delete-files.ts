import { glob } from 'node:fs/promises'
import { logError } from '@lib/logger/helpers/log-error'
import {
  FILE_DELETION_ERROR,
  FILES_SUCCESSFULLY_DELETED,
  NO_FILES_FOUND_TO_DELETE,
} from '@messages/loggings/file-loggings'
import { logger } from '@sentry/node'
import fs from 'fs-extra'

export async function deleteFiles(filesPattern: string) {
  const filesToDelete = await Array.fromAsync(glob(filesPattern))

  if (filesToDelete.length === 0) {
    logger.debug(NO_FILES_FOUND_TO_DELETE, { filesPattern })
    return
  }

  try {
    await Promise.all(filesToDelete.map((file) => fs.unlink(file)))

    logger.info(FILES_SUCCESSFULLY_DELETED, { filesToDelete })

    return true
  } catch (error: unknown) {
    logError({ error, context: { filesToDelete }, message: FILE_DELETION_ERROR })
    return false
  }
}
