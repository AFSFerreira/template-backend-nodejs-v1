import type { Keyword, KeywordType, Prisma } from '@prisma/client'

export interface FindOrCreateInput {
  value: string
  type: KeywordType
}

export interface KeywordRepository {
  create: (data: Prisma.KeywordUncheckedCreateInput) => Promise<Keyword>
  findBy: (where: Prisma.KeywordWhereInput) => Promise<Keyword | null>
  findOrCreate: (data: FindOrCreateInput) => Promise<Keyword>
  findManyByUserId: (userId: number) => Promise<Keyword[]>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.KeywordUpdateInput) => Promise<Keyword>
}
