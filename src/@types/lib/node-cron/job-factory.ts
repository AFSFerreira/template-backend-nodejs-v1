import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Logger } from 'pino'
import type { AsyncJob } from './job'

export type JobFactory = (ctx: { logger?: Logger; dbContext?: DatabaseContext }) => AsyncJob
