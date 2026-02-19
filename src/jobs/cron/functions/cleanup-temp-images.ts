import type { JobFactory } from '@custom-types/lib/node-cron/job-factory'
import { TEMP_PROFILE_IMAGES_TTL_IN_MS } from '@constants/cache-constants'
import { TEMP_FILES_DIR } from '@constants/dynamic-file-constants'
import { cleanupFiles } from '@utils/files/cleanup-files'

export const cleanupTempImagesJobFactory: JobFactory = (_ctx) => {
  return () => cleanupFiles(TEMP_FILES_DIR, { ttlInMs: TEMP_PROFILE_IMAGES_TTL_IN_MS })
}
