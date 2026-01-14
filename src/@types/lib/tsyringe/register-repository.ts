import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { DependencyContainer } from 'tsyringe'

export interface IRegisterRepository {
  contextKey: string
  container: DependencyContainer
  target: new (dbContext: DatabaseContext) => unknown
}
