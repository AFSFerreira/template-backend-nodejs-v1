// import { DatabaseScheduler } from '@jobs/cron/schedulers/dabatase-scheduler'

import type { SchedulerManager } from '@lib/bullmq/helpers/scheduler-manager'
import { DatabaseScheduler } from '@jobs/cron/schedulers/dabatase-scheduler'
import { FileScheduler } from '@jobs/cron/schedulers/file-scheduler'
import { logger } from '@lib/logger'

export class ApplicationScheduler {
  private schedulers: SchedulerManager[] = []

  constructor() {
    this.schedulers.push(new FileScheduler(), new DatabaseScheduler())
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
