import type { TaskOptions } from 'node-cron'
import type { JobFactory } from './job-factory'

export interface IStartJob {
  name: string
  cronExpr: string
  factory: JobFactory
  options: TaskOptions
}
