import { eraseEmptyFoldersJobFactory } from '@jobs/cron/functions/erase-empty-folders'
import { BaseScheduler } from '@lib/node-cron/helpers/base-scheduler'
import { nodeCronTokens } from '@lib/node-cron/helpers/tokens'
import { cleanupTempImagesJobFactory } from '../functions/cleanup-temp-images'

export class FileScheduler extends BaseScheduler {
  protected setupJobs() {
    this.register(nodeCronTokens.fileTasks.tempImagesCleanup, '0 3 * * *', cleanupTempImagesJobFactory)
    this.register(nodeCronTokens.fileTasks.emptyFoldersCleanup, '0 3 * * 0', eraseEmptyFoldersJobFactory)
  }
}
