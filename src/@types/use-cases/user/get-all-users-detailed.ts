import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllUsersDetailedQuerySchemaType } from '@custom-types/http/schemas/user/get-all-users-detailed-query-schema'
import type { CustomUserWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/user-simplified'

export interface GetAllUsersDetailedUseCaseRequest extends GetAllUsersDetailedQuerySchemaType {}

export interface GetAllUsersCaseResponse extends PaginatedResult<CustomUserWithSimplifiedDetails[]> {}
