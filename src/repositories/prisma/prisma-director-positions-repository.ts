import type { ListAllDirectorPositionsQuery } from '@custom-types/repository/prisma/director-position/list-all-director-positions-query'
import type { UpdateDirectorPositionQuery } from '@custom-types/repository/prisma/director-position/update-director-position-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaDirectorPositionsRepository implements DirectorPositionsRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: Prisma.DirectorPositionCreateInput) {
    const directorPosition = await this.dbContext.client.directorPosition.create({ data })
    return directorPosition
  }

  async findUniqueBy(where: Prisma.DirectorPositionWhereUniqueInput) {
    const directorPosition = await this.dbContext.client.directorPosition.findUnique({ where })
    return directorPosition
  }

  async listAll(query?: ListAllDirectorPositionsQuery) {
    const where: Prisma.DirectorPositionWhereInput = {
      ...(query?.position
        ? {
            position: {
              contains: query.position,
              mode: 'insensitive',
            },
          }
        : {}),
    }
    const orderBy: Prisma.DirectorPositionOrderByWithRelationInput[] = [{ precedence: 'asc' }, { id: 'asc' }]

    if (!query) {
      const directorPositions = await this.dbContext.client.directorPosition.findMany({ where, orderBy })

      return {
        data: directorPositions,
        meta: {
          totalItems: directorPositions.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: directorPositions.length,
        },
      }
    }

    const { limit: take, offset: skip } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, directorPositions] = await Promise.all([
      this.dbContext.client.directorPosition.count({ where }),
      this.dbContext.client.directorPosition.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: directorPositions,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async delete(id: number) {
    await this.dbContext.client.directorPosition.delete({
      where: { id },
    })
  }

  async update({ id, data }: UpdateDirectorPositionQuery) {
    const directorPosition = await this.dbContext.client.directorPosition.update({
      where: { id },
      data,
    })
    return directorPosition
  }
}
