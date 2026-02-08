import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { AddressStateFindOrCreateQuery } from '@custom-types/repository/prisma/address-state/address-state-find-or-create-query'
import type { AddressStates } from '@custom-types/repository/prisma/address-state/address-states'
import type { ListAllAddressStateQuery } from '@custom-types/repository/prisma/address-state/list-all-address-state-query'
import type { AddressState } from '@prisma/generated/client'

export interface AddressStatesRepository {
  findOrCreate: (data: AddressStateFindOrCreateQuery) => Promise<AddressState>
  listAllAddressesStates: (query: ListAllAddressStateQuery) => Promise<PaginatedResult<AddressStates[]>>
}
