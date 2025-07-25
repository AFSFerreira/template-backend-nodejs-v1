import type { Prisma } from '@prisma/client'
import type { KeywordRepository } from '../keyword-repository'
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

  async findOrCreate(value: string) {
    const keyword = await prisma.keyword.upsert({
      where: { value },
      update: {},
      create: {
        value,
      },
    })
    return keyword
  }

  async findManyByUserId(userId: string) {
    const keywords = await prisma.keyword.findMany({
      where: {
        user: {
          some: {
            id: userId,
          },
        },
      },
    })
    return keywords
  }

  async delete(id: string) {
    await prisma.keyword.delete({ where: { id } })
  }

  async update(id: string, data: Prisma.KeywordUpdateInput) {
    const keyword = await prisma.keyword.update({ where: { id }, data })
    return keyword
  }
}
