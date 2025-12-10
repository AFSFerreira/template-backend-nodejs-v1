import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { AddressStates } from '@custom-types/repository/address-state/address-states'
import type { GetAllStatesQuerySchemaType } from '@custom-types/schemas/address/get-all-states-query-schema'

export interface GetAllStatesUseCaseRequest extends GetAllStatesQuerySchemaType {}

export interface GetAllStatesUseCaseResponse extends PaginatedResult<AddressStates[]> {}
