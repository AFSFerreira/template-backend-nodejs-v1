import type { CustomUserWithSimplifiedDetails } from '@custom-types/adapter/user-simplified'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllUsersDetailedQuerySchemaType } from '@custom-types/schemas/user/get-all-users-detailed-query-schema'

export interface GetAllUsersDetailedUseCaseRequest extends GetAllUsersDetailedQuerySchemaType {}

export interface GetAllUsersCaseResponse extends PaginatedResult<CustomUserWithSimplifiedDetails[]> {}
