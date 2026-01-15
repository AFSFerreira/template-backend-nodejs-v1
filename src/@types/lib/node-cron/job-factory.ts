import type { Logger } from 'pino'
import type { AsyncJob } from './job'

export type JobFactory = (ctx: { logger?: Logger }) => AsyncJob
