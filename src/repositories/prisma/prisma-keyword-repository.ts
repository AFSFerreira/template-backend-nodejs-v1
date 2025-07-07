import type { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
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

  async findManyByUserId(userId: string) {
    const keywords = await prisma.keyword.findMany({
      where: {
        Users: {
          some: {
            id: userId
          }
        }
      },
    })
    return keywords
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

  async delete(id: string) {
    await prisma.keyword.delete({ where: { id } })
  }

  async update(id: string, data: Prisma.KeywordUpdateInput) {
    const keyword = await prisma.keyword.update({ where: { id }, data })
    return keyword
  }
}
