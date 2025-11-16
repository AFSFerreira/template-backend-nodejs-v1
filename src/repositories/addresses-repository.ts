import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { AddressStates } from '@custom-types/repositories/address/address-states'
import type { ListAllAddressStateQuery } from '@custom-types/repositories/address/list-all-address-state-query'
import type { Address, Prisma } from '@prisma/client'

export interface AddressesRepository {
  create: (data: Prisma.AddressUncheckedCreateInput) => Promise<Address>
  findBy: (where: Prisma.AddressWhereInput) => Promise<Address | null>
  listAllAddressesStates: (query?: ListAllAddressStateQuery) => Promise<PaginatedResult<AddressStates[]>>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.AddressUpdateInput) => Promise<Address>
}
