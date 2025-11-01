import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { evalOffset } from '@utils/eval-offset'
import { evalTotalPages } from '@utils/eval-total-pages'
import type { AddressesRepository, ListAllAddressStateQuery } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = await prisma.address.create({ data })
    return address
  }

  async findBy(where: Prisma.AddressWhereInput) {
    const address = await prisma.address.findFirst({ where })
    return address
  }

  async listAllAddressesStates(query?: ListAllAddressStateQuery) {
    const orderBy = {
      _count: { userId: query.orderBy.usersCount },
    }

    // WIP:
    // if (!query) {
    //   const addresses = await prisma.address.findMany({
    //     select: {
    //       state: true,
    //     },
    //     orderBy: {
    //       country: 'asc',
    //       id: 'asc',
    //     }
    //   })

    //   return {
    //     data: addresses,
    //     meta: {
    //       totalItems: addresses.length,
    //       totalPages: 1,
    //       currentPage: 1,
    //       pageSize: addresses.length,
    //     }
    //   }
    // }

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
        skip,
        take,
        orderBy,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult.length

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: addresses.map((address) => ({
        state: address.state,
        usersCount: address._count.userId,
      })),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
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
