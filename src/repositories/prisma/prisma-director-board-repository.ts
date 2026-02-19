import type { OrderableType } from '@custom-types/custom/orderable'
import type { CreateDirectorBoardQuery } from '@custom-types/repository/prisma/director-board/create-director-board-query'
import type { listAllDirectorBoardMembers } from '@custom-types/repository/prisma/director-board/list-all-director-board-members'
import type { UpdateDirectorBoardQuery } from '@custom-types/repository/prisma/director-board/update-director-board-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import { directorBoardWithUser } from '@custom-types/validators/director-board-with-user'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaDirectorBoardRepository implements DirectorBoardRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: CreateDirectorBoardQuery) {
    const { userId, directorPositionId, ...filteredInfo } = data

    const directorBoard = await this.dbContext.client.directorBoard.create({
      data: {
        ...filteredInfo,
        DirectorPosition: {
          connect: {
            id: directorPositionId,
          },
        },
        User: {
          connect: {
            id: userId,
          },
        },
      },
      include: directorBoardWithUser.include,
    })

    return directorBoard
  }

  async update({ id, data }: UpdateDirectorBoardQuery) {
    const { directorPositionId, ...filteredInfo } = data

    const directorBoard = await this.dbContext.client.directorBoard.update({
      where: { id },
      data: {
        ...filteredInfo,
        DirectorPosition: {
          connect: {
            id: directorPositionId,
          },
        },
      },
      include: directorBoardWithUser.include,
    })

    return directorBoard
  }

  async findByUserId(userId: number) {
    const directorPosition = await this.dbContext.client.directorBoard.findUnique({
      where: { userId },
    })
    return directorPosition
  }

  async findByDirectorPositionId(directorPositionId: number) {
    const directorPosition = await this.dbContext.client.directorBoard.findUnique({
      where: { directorPositionId },
    })
    return directorPosition
  }

  async findByPublicId(publicId: string) {
    const directorBoard = await this.dbContext.client.directorBoard.findUnique({
      where: { publicId },
      include: directorBoardWithUser.include,
    })
    return directorBoard
  }

  async delete(id: number) {
    await this.dbContext.client.directorBoard.delete({
      where: { id },
    })
  }

  async deleteByUserId(userId: number) {
    await this.dbContext.client.directorBoard.deleteMany({
      where: { userId },
    })
  }

  async listAllDirectorBoardMembers(query: listAllDirectorBoardMembers) {
    const orderBy: Prisma.DirectorBoardOrderByWithRelationInput[] = [
      ...(query.orderBy?.precedenceOrder
        ? [
            {
              DirectorPosition: {
                precedence: query.orderBy.precedenceOrder,
              },
            },
          ]
        : []),
      ...(query.orderBy?.fullNameOrder ? [{ User: { fullName: query.orderBy.fullNameOrder } }] : []),
      { id: 'asc' as OrderableType },
    ]

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
