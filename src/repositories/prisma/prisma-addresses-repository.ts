import { prisma } from '@lib/prisma'
import { type Prisma } from '@prisma/client'
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
