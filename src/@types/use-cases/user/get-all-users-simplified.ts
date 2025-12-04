import type { CustomUserWithSimplifiedDetails } from '@custom-types/adapter/output/custom-user-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllUsersSimplifiedQuerySchemaType } from '@custom-types/schemas/user/get-all-users-simplified-query-schema'

export interface GetAllUsersUseCaseRequest extends GetAllUsersSimplifiedQuerySchemaType {}

export interface GetAllUsersSimplifiedCaseResponse extends PaginatedResult<CustomUserWithSimplifiedDetails[]> {}
