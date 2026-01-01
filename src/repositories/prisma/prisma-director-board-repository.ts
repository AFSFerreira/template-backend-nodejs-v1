import type { CreateDirectorBoardQuery } from '@custom-types/repository/director-board/create-director-board-query'
import type { listAllDirectorBoardMembers } from '@custom-types/repository/director-board/list-all-director-board-members'
import type { OrderableType } from '@custom-types/validators/orderable'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import { directorBoardWithUser } from '@custom-types/validators/director-board-with-user'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaDirectorBoardRepository implements DirectorBoardRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: CreateDirectorBoardQuery) {
    return await this.dbContext.client.directorBoard.create({
      data: {
        User: { connect: { id: data.userId } },
        DirectorPosition: { connect: { id: data.directorPositionId } },
        aboutMe: '',
        directorBoardProfileImage: data.directorBoardProfileImage,
      },
    })
  }

  async deleteByUserId(userId: number) {
    await this.dbContext.client.directorBoard.deleteMany({
      where: { userId },
    })
  }

  async listAllDirectorBoardMembers(query?: listAllDirectorBoardMembers) {
    const orderBy: Prisma.DirectorBoardOrderByWithRelationInput[] = [
      ...(query?.orderBy?.precedenceOrder
        ? [
            {
              DirectorPosition: {
                precedence: query.orderBy.precedenceOrder,
              },
            },
          ]
        : []),
      { User: { fullName: 'asc' as OrderableType } },
      { id: 'asc' as OrderableType },
    ]

    if (!query) {
      const directors = await this.dbContext.client.directorBoard.findMany({
        include: directorBoardWithUser.include,
        orderBy,
      })

      return {
        data: directors,
        meta: {
          totalItems: directors.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: directors.length,
        },
      }
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, directors] = await Promise.all([
      this.dbContext.client.directorBoard.count(),
      this.dbContext.client.directorBoard.findMany({
        skip,
        take,
        orderBy,
        include: directorBoardWithUser.include,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: directors,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }
}
