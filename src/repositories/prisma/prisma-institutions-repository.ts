import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { evalOffset } from '@utils/eval-offset'
import { evalTotalPages } from '@utils/eval-total-pages'
import type { InstitutionsRepository, ListAllInstitutionsWithUsersQuery } from '../institutions-repository'

export class PrismaInstitutionsRepository implements InstitutionsRepository {
  async create(data: Prisma.InstitutionUncheckedCreateInput) {
    const institution = await prisma.institution.create({
      data,
    })
    return institution
  }

  async findById(id: number) {
    const institution = await prisma.institution.findUnique({
      where: { id },
    })
    return institution
  }

  async findByName(name: string) {
    const institution = await prisma.institution.findUnique({
      where: { name },
    })
    return institution
  }

  async listAllInstitutionsWithUsersCount(query?: ListAllInstitutionsWithUsersQuery) {
    const orderBy = {
      User: { _count: query.orderBy.usersCount },
    }

    const include = {
      _count: {
        select: { User: true },
      },
    }

    if (!query) {
      const institutions = await prisma.institution.findMany({ orderBy, include })

      const formattedInstitutions = institutions.map((institution) => ({
        name: institution.name,
        usersCount: institution._count.User,
      }))

      return {
        data: formattedInstitutions,
        meta: {
          totalItems: institutions.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: institutions.length,
        },
      }
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, institutions] = await Promise.all([
      prisma.institution.count(),
      prisma.institution.findMany({
        skip,
        take,
        orderBy,
        include,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: institutions.map((institution) => ({
        name: institution.name,
        usersCount: institution._count.User,
      })),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }
}
