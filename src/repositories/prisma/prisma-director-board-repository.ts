import { directorBoardWithUser } from '@custom-types/director-board-with-user'
import type { OrderableType } from '@custom-types/orderable'
import { prisma } from '@lib/prisma'
import type { DirectorBoardRepository, listAllDirectorBoardMembers } from '@repositories/directors-board-repository'
import { evalOffset } from '@utils/eval-offset'
import { evalTotalPages } from '@utils/eval-total-pages'

export class PrismaDirectorBoardRepository implements DirectorBoardRepository {
  async listAllDirectorBoardMembers(query?: listAllDirectorBoardMembers) {
    const orderBy = {
      DirectorPosition: {
        precedence: query.orderBy.precedenceOrder,
      },
      User: { fullName: 'asc' as OrderableType },
      id: 'asc' as OrderableType,
    }

    if (!query) {
      const directors = await prisma.directorBoard.findMany({
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
      prisma.directorBoard.count(),
      prisma.directorBoard.findMany({
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
