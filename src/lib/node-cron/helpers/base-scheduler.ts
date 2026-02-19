import type { SchedulerOptions } from '@custom-types/lib/node-cron/scheduler-options'
import { SchedulerManager } from './scheduler-manager'

export abstract class BaseScheduler extends SchedulerManager {
  constructor(options: SchedulerOptions) {
    super(options)
    this.setupJobs()
  }

  protected abstract setupJobs(): void
}
