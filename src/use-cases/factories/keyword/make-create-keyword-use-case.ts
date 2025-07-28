
import { PrismaKeywordRepository } from '@/repositories/prisma/prisma-keyword-repository'
import { CreateKeywordUseCase } from '@/use-cases/keyword/create-keyword-use-case'

export function makeCreateKeywordUseCase() {
  const keywordRepository = new PrismaKeywordRepository()
  return new CreateKeywordUseCase(keywordRepository)
}
