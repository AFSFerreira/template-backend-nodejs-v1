import type { Address, Prisma } from '@prisma/client'

export interface AddressRepository {
  create: (data: Prisma.AddressUncheckedCreateInput) => Promise<Address>
  findBy: (where: Prisma.AddressWhereInput) => Promise<Address | null>
  delete: (id: string) => Promise<void>
  update: (id: string, data: Prisma.AddressUpdateInput) => Promise<Address>
}
