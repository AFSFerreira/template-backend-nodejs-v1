import { type PaginatedResult } from '@custom-types/pagination-meta-type'
import type { Address, Prisma } from '@prisma/client'
import type { GetAllStatesQuerySchemaType } from '@schemas/address/get-all-states-query-schema'

export interface ListAllAddressStateQuery extends GetAllStatesQuerySchemaType {}

export interface AddressStates {
  state: string
  usersCount: number
}

export interface AddressRepository {
  create: (data: Prisma.AddressUncheckedCreateInput) => Promise<Address>
  findBy: (where: Prisma.AddressWhereInput) => Promise<Address | null>
  listAllAddressesStates: (query?: ListAllAddressStateQuery) => Promise<PaginatedResult<AddressStates[]>>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.AddressUpdateInput) => Promise<Address>
}
