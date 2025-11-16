import type { ListAllInstitutionsNamesQuery } from '@custom-types/repositories/institution/list-all-institutions-names-query'
import type { ListAllInstitutionsWithUsersQuery } from '@custom-types/repositories/institution/list-all-institutions-with-users-query'
import type { OrderableType } from '@custom-types/validator/orderable'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { evalOffset } from '@utils/eval-offset'
import { evalTotalPages } from '@utils/eval-total-pages'
import type { InstitutionsRepository } from '../institutions-repository'

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

  async listAllInstitutionsNames(query?: ListAllInstitutionsNamesQuery) {
    const orderBy: Prisma.InstitutionOrderByWithRelationInput[] = [
      { name: 'asc' as OrderableType },
      { id: 'asc' as OrderableType },
    ]

    if (!query) {
      const institutions = await prisma.institution.findMany({ orderBy })

      const formattedInstitutions = institutions.map((institution) => institution.name)

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

    const where: Prisma.InstitutionWhereInput = {
      name: { contains: query.name },
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, institutions] = await Promise.all([
      prisma.institution.count({ where }),
      prisma.institution.findMany({
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
      data: institutions.map((institution) => institution.name),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async listAllInstitutionsWithUsersCount(query?: ListAllInstitutionsWithUsersQuery) {
    const orderBy: Prisma.InstitutionOrderByWithRelationInput[] = [
      {
        User: { _count: query.orderBy.usersCount },
      },
    ]

    const include: Prisma.InstitutionInclude = {
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
