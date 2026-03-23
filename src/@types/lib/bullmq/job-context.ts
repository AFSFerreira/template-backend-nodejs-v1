import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Logger } from 'pino'

export interface JobContext {
  logger?: Logger
  dbContext?: DatabaseContext
}
