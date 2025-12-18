import type Redis from 'ioredis'
import type { Logger } from 'pino'
// import type { Registry } from 'prom-client'

export interface SchedulerOptions {
  logger?: Logger
  redis?: Redis
  // promContext?: {
  //   prefix?: string
  //   client: Registry
  // }
}
