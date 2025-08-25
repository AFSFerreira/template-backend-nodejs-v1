import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import type { KeywordRepository } from '../keyword-repository'

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
      create: { value },
    })
    return keyword
  }

  async findManyByUserId(userId: number) {
    const keywords = await prisma.keyword.findMany({
      where: {
        User: {
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
