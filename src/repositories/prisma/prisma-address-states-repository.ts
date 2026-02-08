import type { AddressStateFindOrCreateQuery } from '@custom-types/repository/prisma/address-state/address-state-find-or-create-query'
import type { ListAllAddressStateQuery } from '@custom-types/repository/prisma/address-state/list-all-address-state-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import type { Prisma } from '@prisma/generated/client'
import { MembershipStatusType, UserRoleType } from '@prisma/generated/enums'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaAddressStatesRepository implements AddressStatesRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  async findOrCreate(data: AddressStateFindOrCreateQuery) {
    const addressState = await this.dbContext.client.addressState.upsert({
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

  async listAllAddressesStates(query: ListAllAddressStateQuery) {
    const userConstraint: Prisma.AddressWhereInput = {
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

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, addressesGrouped] = await Promise.all([
      this.dbContext.client.addressState.count({ where }),
      this.dbContext.client.addressState.findMany({
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
