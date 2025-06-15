import type { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import type { KeywordRepository } from '../keyword-repository'

export class PrismaKeywordRepository implements KeywordRepository {
  async create(data: Prisma.KeywordCreateInput) {
    const keyword = await prisma.keyword.create({ data })
    return keyword
  }

  async findById(id: string) {
    const keyword = await prisma.keyword.findUnique({ where: { id } })
    return keyword
  }

  async findManyByUserId(userId: string) {
    const keywords = await prisma.keyword.findMany({ where: { userId } })
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
