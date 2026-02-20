import type { JobsOptions } from 'bullmq'

export interface ScalableTaskOptions extends JobsOptions {
  timezone: string
}
