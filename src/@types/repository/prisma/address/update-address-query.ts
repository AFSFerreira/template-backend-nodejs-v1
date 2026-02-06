import type { Prisma } from '@prisma/generated/client'

export interface UpdateAddressQuery {
  id: number
  data: Prisma.AddressUpdateInput
}
