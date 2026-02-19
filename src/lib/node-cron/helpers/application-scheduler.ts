import type { SchedulerManager } from '@lib/node-cron/helpers/scheduler-manager'
import { DatabaseScheduler } from '@jobs/cron/schedulers/dabatase-scheduler'
import { FileScheduler } from '@jobs/cron/schedulers/file-scheduler'
import { logger } from '@lib/logger'
import { redisConnection } from '@lib/redis/helpers/configuration'

export class ApplicationScheduler {
  private schedulers: SchedulerManager[] = []

  constructor() {
    const options = { logger, redis: redisConnection }

    this.schedulers.push(new FileScheduler(options), new DatabaseScheduler(options))
  }

  async startAll() {
    logger.info('[ApplicationSchedulers] Iniciando todos os Schedulers da aplicação...')

    await Promise.all(this.schedulers.map((scheduler) => scheduler.startAll()))
  }

  async stopAll() {
    logger.info('[ApplicationSchedulers] Parando todos os Schedulers...')

    await Promise.all(this.schedulers.map((scheduler) => scheduler.stopAll()))
  }
}
