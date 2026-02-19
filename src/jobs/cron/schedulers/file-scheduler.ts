import { eraseEmptyFoldersJobFactory } from '@jobs/cron/functions/erase-empty-folders'
import { BaseScheduler } from '@lib/node-cron/helpers/base-scheduler'
import { cronSchema } from '@schemas/utils/generic-components/cron-schema'
import ms from 'ms'
import { cleanupTempImagesJobFactory } from '../functions/cleanup-temp-images'

export class FileScheduler extends BaseScheduler {
  protected setupJobs() {
    this.register('erase-temp-images', cronSchema.parse('* * * * *'), cleanupTempImagesJobFactory, {
      maxRandomDelay: ms('20s'),
    })
    this.register('erase-empty-folders', cronSchema.parse('0 3 * * 0'), eraseEmptyFoldersJobFactory, {
      maxRandomDelay: ms('20s'),
    })
  }
}
