import type { Address, Prisma } from '@prisma/client'

export interface AddressesRepository {
  create: (data: Prisma.AddressUncheckedCreateInput) => Promise<Address>
  findBy: (where: Prisma.AddressWhereInput) => Promise<Address | null>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.AddressUpdateInput) => Promise<Address>
}
