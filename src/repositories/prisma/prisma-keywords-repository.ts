import type { UpdateKeywordsQuery } from '@custom-types/repository/prisma/keyword/update-keywords-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { KeywordsRepository } from '../keywords-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaKeywordsRepository implements KeywordsRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  async create(data: Prisma.KeywordUncheckedCreateInput) {
    const keyword = await this.dbContext.client.keyword.create({ data })
    return keyword
  }

  async findBy(where: Prisma.KeywordWhereInput) {
    const keyword = await this.dbContext.client.keyword.findFirst({ where })
    return keyword
  }

  async findOrCreate(value: string) {
    const keyword = await this.dbContext.client.keyword.upsert({
      where: { value },
      update: {},
      create: { value },
    })
    return keyword
  }

  async findManyByUserId(userId: number) {
    const keywords = await this.dbContext.client.keyword.findMany({
      where: {
        User: {
          some: { id: userId },
        },
      },
      orderBy: [{ value: 'asc' }, { id: 'asc' }],
    })
    return keywords
  }

  async delete(id: number) {
    await this.dbContext.client.keyword.delete({ where: { id } })
  }

  async update({ id, data }: UpdateKeywordsQuery) {
    const keyword = await this.dbContext.client.keyword.update({ where: { id }, data })
    return keyword
  }
}
