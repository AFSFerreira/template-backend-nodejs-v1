import { PrismaKeywordRepository } from '@/repositories/prisma/prisma-keyword-repository'
import { CreateKeywordUseCase } from '../create-keyword'

export function makeCreateKeywordUseCase() {
  const keywordRepository = new PrismaKeywordRepository()
  return new CreateKeywordUseCase(keywordRepository)
}
