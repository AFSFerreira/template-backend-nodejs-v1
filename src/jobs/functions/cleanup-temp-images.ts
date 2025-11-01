import {
  ERASE_FILES_CONCURRENCY,
  TEMP_FILES_DIRECTORY_ABSOLUTE_PATH,
  TEMP_PROFILE_IMAGES_TTL_IN_MS,
} from '@constants/jobs-configuration-constants'
import fs from 'fs/promises'
import path from 'node:path'

import { logger } from '@lib/logger'
import {
  DAILY_TEMP_IMAGES_CLEANUP,
  DELETE_FAILURE,
  FILE_LIFETIME_CALCULATION_ERROR,
  FILE_REMOVAL_ERROR,
  LISTING_FILES_ERROR,
} from '@messages/loggings'

async function listFiles(dir: string) {
  return await fs.readdir(dir, { withFileTypes: true })
}

async function getFileAgeInMs(filePath: string) {
  const st = await fs.stat(filePath)
  const created = st.birthtimeMs || st.ctimeMs || st.mtimeMs
  return Date.now() - created
}

async function removeFile(filePath: string) {
  try {
    await fs.unlink(filePath)
  } catch (error) {
    logger.error({ path: filePath, error }, DELETE_FAILURE)
  }
}

export async function cleanupTempImages() {
  logger.info(DAILY_TEMP_IMAGES_CLEANUP)

  let fileNames: string[] | undefined

  try {
    const entries = await listFiles(TEMP_FILES_DIRECTORY_ABSOLUTE_PATH)
    fileNames = entries.filter((entry) => entry.isFile()).map((file) => file.name)
  } catch (error) {
    logger.error({ path: TEMP_FILES_DIRECTORY_ABSOLUTE_PATH, error }, LISTING_FILES_ERROR)
    return false
  }

  for (let idx = 0; idx < fileNames.length; idx += ERASE_FILES_CONCURRENCY) {
    const deleteBatch = fileNames.slice(idx, idx + ERASE_FILES_CONCURRENCY)

    await Promise.all(
      deleteBatch.map(async (fileName) => {
        const fullFilePath = path.join(TEMP_FILES_DIRECTORY_ABSOLUTE_PATH, fileName)

        let fileAgeMs: number | undefined
        try {
          fileAgeMs = await getFileAgeInMs(fullFilePath)
        } catch (error) {
          logger.error({ path: fullFilePath, error }, FILE_LIFETIME_CALCULATION_ERROR)
          return false
        }

        if (fileAgeMs <= TEMP_PROFILE_IMAGES_TTL_IN_MS) return false

        try {
          await removeFile(fullFilePath)
        } catch (error) {
          logger.error({ path: fullFilePath, error }, FILE_REMOVAL_ERROR)
          return false
        }

        return true
      }),
    )
  }
}
