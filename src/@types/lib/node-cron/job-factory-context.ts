import type { TaskOptions } from 'node-cron'
import type { JobFactory } from './job-factory'

export interface JobFactoryContext {
  cronExpr: string
  factory: JobFactory
  options: TaskOptions
}
