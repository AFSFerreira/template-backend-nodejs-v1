import type { Prisma, Address } from '@prisma/client'

export interface AddressRepository {
  create: (data: Prisma.AddressCreateInput) => Promise<Address>
  findById: (id: string) => Promise<Address | null>
  findByUserId: (userId: string) => Promise<Address | null>
  delete: (id: string) => Promise<void>
  update: (id: string, data: Prisma.AddressUpdateInput) => Promise<Address>
}
