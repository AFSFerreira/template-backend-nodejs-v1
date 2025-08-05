import type { Prisma } from '@prisma/client'
import type {
  FindOrCreateInput,
  KeywordRepository,
} from '../keyword-repository'
import { prisma } from '@/lib/prisma'

export class PrismaKeywordRepository implements KeywordRepository {
  async create(data: Prisma.KeywordUncheckedCreateInput) {
    const keyword = await prisma.keyword.create({ data })
    return keyword
  }

  async findBy(where: Prisma.KeywordWhereInput) {
    const keyword = await prisma.keyword.findFirst({ where })
    return keyword
  }

  async findOrCreate(data: FindOrCreateInput) {
    const keyword = await prisma.keyword.upsert({
      where: { type_value: data },
      update: {},
      create: data,
    })
    return keyword
  }

  async findManyByUserId(userId: number) {
    const keywords = await prisma.keyword.findMany({
      where: {
        UserKeywords: {
          some: {
            id: userId,
          },
        },
      },
    })
    return keywords
  }

  async delete(id: number) {
    await prisma.keyword.delete({ where: { id } })
  }

  async update(id: number, data: Prisma.KeywordUpdateInput) {
    const keyword = await prisma.keyword.update({ where: { id }, data })
    return keyword
  }
}
