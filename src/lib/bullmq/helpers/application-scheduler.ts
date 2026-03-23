// import { DatabaseScheduler } from '@jobs/cron/schedulers/dabatase-scheduler'

import type { SchedulerManager } from '@lib/bullmq/helpers/scheduler-manager'
import { logger } from '@lib/pino'

export class ApplicationScheduler {
  private schedulers: SchedulerManager[] = []

  async startAll() {
    logger.info('[ApplicationSchedulers] Iniciando todos os Schedulers da aplicação...')

    await Promise.all(this.schedulers.map((scheduler) => scheduler.startAll()))
  }

  async stopAll() {
    logger.info('[ApplicationSchedulers] Parando todos os Schedulers...')

    await Promise.all(this.schedulers.map((scheduler) => scheduler.stopAll()))
  }
}
