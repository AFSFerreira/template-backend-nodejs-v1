import type { BaseScheduler } from '@lib/bullmq/helpers/base-scheduler'
import { cleanupAuditsJobFactory } from '@jobs/cron/functions/database/cleanup-audits'
import { bullmqTokens } from '@lib/bullmq/helpers/bullmq-tokens'
import { SchedulerManager } from '@lib/bullmq/helpers/scheduler-manager'
import { logger } from '@lib/logger'
import { redisConnection } from '@lib/redis/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { container } from 'tsyringe'

export class DatabaseScheduler extends SchedulerManager implements BaseScheduler {
  constructor() {
    super({
      queueName: bullmqTokens.queues.schedulers.databaseTasks,
      redis: redisConnection,
      jobsContext: {
        logger,
        dbContext: container.resolve(tsyringeTokens.infra.database),
      },
    })

    this.setupJobs()
  }

  setupJobs() {
    this.register(bullmqTokens.cron.databaseTasks.auditCleanup, '* * * * *', cleanupAuditsJobFactory)
  }
}
