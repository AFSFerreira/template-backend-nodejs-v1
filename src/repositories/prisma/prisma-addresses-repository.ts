import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { evalOffset } from '@utils/eval-offset'
import type { AddressesRepository, ListAllAddressStateQuery } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = await prisma.address.create({
      data,
    })
    return address
  }

  async findBy(where: Prisma.AddressWhereInput) {
    const address = await prisma.address.findFirst({
      where,
    })
    return address
  }

  async listAllAddressesStates(query: ListAllAddressStateQuery) {
    const orderByClause = {
      _count: { userId: query.orderBy.usersCount },
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, addresses] = await Promise.all([
      prisma.address.groupBy({
        by: ['state'],
      }),
      prisma.address.groupBy({
        by: ['state'],
        _count: {
          userId: true,
        },
        orderBy: orderByClause,
        skip,
        take,
      }),
    ])

    const totalItems = countResult.length

    const totalPages = Math.ceil(totalItems / take)

    return {
      data: addresses.map((address) => ({
        state: address.state,
        usersCount: address._count.userId,
      })),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize: take,
      },
    }
  }

  async delete(id: number) {
    await prisma.address.delete({
      where: { id },
    })
  }

  async update(id: number, data: Prisma.AddressUpdateInput) {
    const address = await prisma.address.update({
      where: { id },
      data,
    })
    return address
  }
}
