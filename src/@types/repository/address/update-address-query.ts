import type { Prisma } from '@prisma/client'

export interface UpdateAddressQuery {
  id: number
  data: Prisma.AddressUpdateInput
}
