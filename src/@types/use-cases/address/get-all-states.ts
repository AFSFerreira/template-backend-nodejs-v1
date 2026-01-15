import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllStatesQuerySchemaType } from '@custom-types/http/schemas/address/get-all-states-query-schema'
import type { AddressStates } from '@custom-types/repository/prisma/address-state/address-states'

export interface GetAllStatesUseCaseRequest extends GetAllStatesQuerySchemaType {}

export interface GetAllStatesUseCaseResponse extends PaginatedResult<AddressStates[]> {}
