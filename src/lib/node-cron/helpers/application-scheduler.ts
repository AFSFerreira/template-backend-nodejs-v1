import type { SchedulerManager } from '@lib/node-cron/helpers/scheduler-manager'
import { logger } from '@lib/logger'
import { redis } from '@lib/redis'
import { FileScheduler } from '../../../jobs/cron/schedulers/file-scheduler'

export class ApplicationScheduler {
  private schedulers: SchedulerManager[] = []

  constructor() {
    const options = { logger, redis }

    this.schedulers.push(new FileScheduler(options))
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
