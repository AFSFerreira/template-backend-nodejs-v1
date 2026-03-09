import type { JobFactory } from '@custom-types/lib/bullmq/job-factory'
import { TEMP_PROFILE_IMAGES_TTL_IN_MS } from '@constants/cache-constants'
import { TEMP_FILES_DIR } from '@constants/dynamic-file-constants'
import { cleanupFilesRecursive } from '@services/files/cleanup-files-recursive'

export const cleanupTempImagesJobFactory: JobFactory = (_ctx) => {
  return () => cleanupFilesRecursive(TEMP_FILES_DIR, { ttlInMs: TEMP_PROFILE_IMAGES_TTL_IN_MS })
}
