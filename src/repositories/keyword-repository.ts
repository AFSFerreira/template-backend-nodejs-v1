import type { Keyword, Prisma } from '@prisma/client'

export interface KeywordRepository {
  create: (data: Prisma.KeywordUncheckedCreateInput) => Promise<Keyword>
  findBy: (where: Prisma.KeywordWhereInput) => Promise<Keyword | null>
  findOrCreate: (value: string) => Promise<Keyword>
  findManyByUserId: (userId: number) => Promise<Keyword[]>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.KeywordUpdateInput) => Promise<Keyword>
}
