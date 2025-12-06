import type { ListAllAddressStateQuery } from '@custom-types/repositories/address-state/list-all-address-state-query'
import { prisma } from '@lib/prisma'
import { MembershipStatusType, UserRoleType, type Prisma } from '@prisma/client'
import type { AddressStateFindOrCreateQuery, AddressStatesRepository } from '@repositories/address-states-repository'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { injectable } from 'tsyringe'

@injectable()
export class PrismaAddressStatesRepository implements AddressStatesRepository {
  async findOrCreate(data: AddressStateFindOrCreateQuery) {
    const addressState = await prisma.addressState.upsert({
      where: {
        name_countryId: {
          name: data.state,
          countryId: data.countryId,
        },
      },
      update: {},
      create: {
        name: data.state,
        Country: {
          connect: {
            id: data.countryId,
          },
        },
      },
    })

    return addressState
  }

  async listAllAddressesStates(query?: ListAllAddressStateQuery) {
    const userConstraint: Prisma.AddressStateFindManyArgs['where']['Address']['some'] = {
      User: {
        role: {
          notIn: [UserRoleType.ADMIN, UserRoleType.MANAGER],
        },
        membershipStatus: MembershipStatusType.ACTIVE,
      },
    }

    const where = {
      Address: {
        some: userConstraint,
      },
    }

    const include: Prisma.AddressStateInclude = {
      _count: {
        select: {
          Address: {
            where: userConstraint,
          },
        },
      },
    }

    const orderBy: Prisma.AddressStateOrderByWithRelationInput[] = [
      {
        Address: {
          _count: 'desc',
        },
      },
      { id: 'asc' },
    ]

    if (!query) {
      const addressesGrouped = await prisma.addressState.findMany({
        where,
        include,
        orderBy,
      })

      const data = addressesGrouped.map((stateCount) => ({
        state: stateCount.name,
        usersCount: stateCount._count.Address,
      }))

      return {
        data,
        meta: {
          totalItems: data.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: data.length,
        },
      }
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, addressesGrouped] = await Promise.all([
      prisma.addressState.count({ where }),
      prisma.addressState.findMany({
        where,
        skip,
        take,
        include,
        orderBy,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult
    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: addressesGrouped.map((stateCount) => ({
        state: stateCount.name,
        usersCount: stateCount._count.Address,
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
