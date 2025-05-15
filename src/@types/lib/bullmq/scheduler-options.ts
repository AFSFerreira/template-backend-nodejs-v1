import type { RedisOptions } from 'ioredis'
import type { JobContext } from './job-context'
// import type { Registry } from 'prom-client'

export interface SchedulerOptions {
  queueName: string
  redis: RedisOptions
  jobsContext: JobContext
  // promContext?: {
  //   prefix?: string
  //   client: Registry
  // }
}
