import type { AddressRepository } from '../address-repository'
import type { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'

export class PrismaAddressRepository implements AddressRepository {
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

  async create(data: Prisma.AddressCreateInput) {
    const address = await prisma.address.create({
      data,
    })
    return address
  }

  async findById(id: string) {
    const address = await prisma.address.findUnique({
      where: { id },
    })
    return address
  }

  async findByUserId(id: string) {
    const address = await prisma.address.findUnique({
      where: { userId: id },
    })
    return address
  }
}
