import type { Keyword, Prisma } from '@prisma/client'

export interface KeywordRepository {
  create: (data: Prisma.KeywordUncheckedCreateInput) => Promise<Keyword>
  findById: (id: string) => Promise<Keyword | null>
  findManyByUserId: (userId: string) => Promise<Keyword[]>
  delete: (id: string) => Promise<void>
  update: (id: string, data: Prisma.KeywordUpdateInput) => Promise<Keyword>
}
