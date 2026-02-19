import type { RedisOptions } from 'ioredis'
import type { Logger } from 'pino'
// import type { Registry } from 'prom-client'

export interface SchedulerOptions {
  redis: RedisOptions
  logger?: Logger
  // promContext?: {
  //   prefix?: string
  //   client: Registry
  // }
}
