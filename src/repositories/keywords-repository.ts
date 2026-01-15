import type { UpdateKeywordsQuery } from '@custom-types/repository/prisma/keyword/update-keywords-query'
import type { Keyword, Prisma } from '@prisma/client'

export interface KeywordsRepository {
  create: (data: Prisma.KeywordUncheckedCreateInput) => Promise<Keyword>
  findBy: (where: Prisma.KeywordWhereInput) => Promise<Keyword | null>
  findOrCreate: (value: string) => Promise<Keyword>
  findManyByUserId: (userId: number) => Promise<Keyword[]>
  delete: (id: number) => Promise<void>
  update: (query: UpdateKeywordsQuery) => Promise<Keyword>
}
