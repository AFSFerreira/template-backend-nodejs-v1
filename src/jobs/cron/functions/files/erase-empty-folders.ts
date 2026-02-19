import type { JobFactory } from '@custom-types/lib/node-cron/job-factory'
import { UPLOADS_DIR } from '@constants/dynamic-file-constants'
import { eraseEmptyFolders } from '@utils/files/erase-empty-folders'

export const eraseEmptyFoldersJobFactory: JobFactory = (_ctx) => {
  return () => eraseEmptyFolders(UPLOADS_DIR, { preserveRoot: false })
}
