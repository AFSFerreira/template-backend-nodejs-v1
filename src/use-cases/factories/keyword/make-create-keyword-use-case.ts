import { CreateKeywordUseCase } from '../../keyword/create-keyword-use-case'
import { PrismaKeywordRepository } from '@/repositories/prisma/prisma-keyword-repository'

export function makeCreateKeywordUseCase() {
  const keywordRepository = new PrismaKeywordRepository()
  return new CreateKeywordUseCase(keywordRepository)
}
