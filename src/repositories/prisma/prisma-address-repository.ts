import type { Prisma } from '@prisma/client'
import type { AddressRepository } from '../address-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAddressRepository implements AddressRepository {
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

  async delete(id: string) {
    await prisma.address.delete({
      where: { id },
    })
  }

  async update(id: string, data: Prisma.AddressUpdateInput) {
    const address = await prisma.address.update({
      where: { id },
      data,
    })
    return address
  }
}
