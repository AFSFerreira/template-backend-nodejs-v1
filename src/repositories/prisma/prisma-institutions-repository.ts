import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { evalOffset } from '@utils/eval-offset'
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

  async listInstitutionsWithUsersCount(query: ListAllInstitutionsWithUsersQuery) {
    const orderByClause = {
      User: { _count: query.orderBy.usersCount },
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, institutions] = await Promise.all([
      prisma.institution.count(),
      prisma.institution.findMany({
        skip,
        take,
        orderBy: orderByClause,
        include: {
          _count: {
            select: { User: true },
          },
        },
      }),
    ])

    const totalPages = Math.ceil(countResult / take)

    return {
      data: institutions.map((institution) => ({
        name: institution.name,
        usersCount: institution._count.User,
      })),
      meta: {
        totalItems: countResult,
        totalPages,
        currentPage: query.page,
        pageSize: take,
      },
    }
  }
}
