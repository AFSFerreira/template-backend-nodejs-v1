import { cleanupAuditsJobFactory } from '@jobs/cron/functions/database/cleanup-audits'
import { BaseScheduler } from '@lib/node-cron/helpers/base-scheduler'
import { nodeCronTokens } from '@lib/node-cron/helpers/tokens'

export class DatabaseScheduler extends BaseScheduler {
  protected setupJobs() {
    this.register(nodeCronTokens.databaseTasks.auditCleanup, '* * * * *', cleanupAuditsJobFactory)
  }
}
