import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { AddressStateFindOrCreateQuery } from '@custom-types/repositories/address-state/address-state-find-or-create-query'
import type { AddressStates } from '@custom-types/repositories/address-state/address-states'
import type { ListAllAddressStateQuery } from '@custom-types/repositories/address-state/list-all-address-state-query'
import type { AddressState } from '@prisma/client'

export interface AddressStatesRepository {
  findOrCreate: (data: AddressStateFindOrCreateQuery) => Promise<AddressState>
  listAllAddressesStates: (query?: ListAllAddressStateQuery) => Promise<PaginatedResult<AddressStates[]>>
}
