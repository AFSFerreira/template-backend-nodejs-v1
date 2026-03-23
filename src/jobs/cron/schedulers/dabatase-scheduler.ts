import type { BaseScheduler } from '@custom-types/lib/bullmq/base-scheduler'
import { cleanupAuditsJobFactory } from '@jobs/cron/functions/database/cleanup-audits'
import { cleanupUserActionAuditsJobFactory } from '@jobs/cron/functions/database/cleanup-user-action-audits'
import { SchedulerManager } from '@lib/bullmq/helpers/scheduler-manager'
import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { logger } from '@lib/pino'
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
    this.register(bullmqTokens.cron.databaseTasks.auditCleanup, '0 3 1 * *', cleanupAuditsJobFactory)
    this.register(
      bullmqTokens.cron.databaseTasks.userActionAuditCleanup,
      '20 3 1 * *',
      cleanupUserActionAuditsJobFactory,
    )
  }
}
