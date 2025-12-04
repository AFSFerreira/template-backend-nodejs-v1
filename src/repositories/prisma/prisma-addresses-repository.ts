import type { ListAllAddressStateQuery } from '@custom-types/repositories/address/list-all-address-state-query'
import { prisma } from '@lib/prisma'
import { UserRoleType, type Prisma } from '@prisma/client'
import { evalOffset } from '@utils/pagination/eval-offset'
import { evalTotalPages } from '@utils/pagination/eval-total-pages'
import type { AddressesRepository } from '../addresses-repository'

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
    const orderBy = [
      {
        _count: { userId: query.orderBy.usersCount },
      },
    ]

    const where = {
      User: {
        role: { notIn: [UserRoleType.ADMIN, UserRoleType.MANAGER] },
      },
    }

    if (!query) {
      const addresses = await prisma.address.groupBy({
        by: ['state'],
        _count: {
          userId: true,
        },
        where,
        orderBy,
      })

      return {
        data: addresses.map((address) => ({
          state: address.state,
          usersCount: address._count.userId,
        })),
        meta: {
          totalItems: addresses.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: addresses.length,
        },
      }
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, addresses] = await Promise.all([
      prisma.address.groupBy({
        by: ['state'],
        where,
      }),
      prisma.address.groupBy({
        by: ['state'],
        _count: {
          userId: true,
        },
        where,
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
