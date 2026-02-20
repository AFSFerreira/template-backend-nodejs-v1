import type { BaseScheduler } from '@lib/bullmq/helpers/base-scheduler'
import { eraseEmptyFoldersJobFactory } from '@jobs/cron/functions/files/erase-empty-folders'
import { bullmqTokens } from '@lib/bullmq/helpers/bullmq-tokens'
import { SchedulerManager } from '@lib/bullmq/helpers/scheduler-manager'
import { logger } from '@lib/pino'
import { redisConnection } from '@lib/redis/helpers/configuration'
import { cleanupTempImagesJobFactory } from '../functions/files/cleanup-temp-images'

export class FileScheduler extends SchedulerManager implements BaseScheduler {
  constructor() {
    super({
      queueName: bullmqTokens.queues.schedulers.fileTasks,
      redis: redisConnection,
      jobsContext: { logger },
    })

    this.setupJobs()
  }

  setupJobs() {
    this.register(bullmqTokens.cron.fileTasks.tempImagesCleanup, '0 3 * * *', cleanupTempImagesJobFactory)
    this.register(bullmqTokens.cron.fileTasks.emptyFoldersCleanup, '0 4 1 * *', eraseEmptyFoldersJobFactory)
  }
}
