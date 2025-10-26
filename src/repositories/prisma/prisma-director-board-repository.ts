import { directorBoardWithUser } from '@custom-types/director-board-with-user'
import { prisma } from '@lib/prisma'
import type { DirectorBoardRepository, listAllDirectorBoardMembers } from '@repositories/directors-board-repository'
import { evalOffset } from '@utils/eval-offset'

export class PrismaDirectorBoardRepository implements DirectorBoardRepository {
  async listAllDirectorBoardMembers(query?: listAllDirectorBoardMembers) {
    if (!query?.page || !query?.limit) {
      const directors = await prisma.directorBoard.findMany({
        include: directorBoardWithUser.include,
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

    const orderByClause = {
      DirectorPosition: {
        precedence: query.orderBy.precedenceOrder,
      },
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, directors] = await Promise.all([
      prisma.directorBoard.count(),
      prisma.directorBoard.findMany({
        skip,
        take,
        orderBy: orderByClause,
        include: directorBoardWithUser.include,
      }),
    ])

    const totalItems = countResult

    const totalPages = Math.ceil(totalItems / query.limit)

    return {
      data: directors,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize: query.limit,
      },
    }
  }
}
