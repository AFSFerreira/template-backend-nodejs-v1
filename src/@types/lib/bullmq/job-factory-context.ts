import type { JobFactory } from './job-factory'
import type { ScalableTaskOptions } from './scalable-task-options'

export interface JobFactoryContext {
  cronExpr: string
  factory: JobFactory
  options: ScalableTaskOptions
}
