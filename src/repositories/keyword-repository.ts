import type { Keyword, Prisma } from '@prisma/client'

export interface KeywordRepository {
  create: (data: Prisma.KeywordUncheckedCreateInput) => Promise<Keyword>
  findBy: (where: Prisma.KeywordWhereInput) => Promise<Keyword | null>
  findOrCreate: (value: string) => Promise<Keyword>
  findManyByUserId: (userId: string) => Promise<Keyword[]>
  delete: (id: string) => Promise<void>
  update: (id: string, data: Prisma.KeywordUpdateInput) => Promise<Keyword>
}
