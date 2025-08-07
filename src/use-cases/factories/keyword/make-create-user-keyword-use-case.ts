import { PrismaKeywordRepository } from '@/repositories/prisma/prisma-keyword-repository'
import { CreateUserKeywordUseCase } from '@/use-cases/keyword/create-user-keyword-use-case'

export function makeCreateUserKeywordUseCase() {
  const keywordRepository = new PrismaKeywordRepository()
  const createKeywordUseCase = new CreateUserKeywordUseCase(keywordRepository)

  return createKeywordUseCase
}
