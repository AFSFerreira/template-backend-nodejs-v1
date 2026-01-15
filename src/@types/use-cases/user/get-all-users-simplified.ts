import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllUsersSimplifiedQuerySchemaType } from '@custom-types/http/schemas/user/get-all-users-simplified-query-schema'
import type { CustomUserWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/user-simplified'

export interface GetAllUsersUseCaseRequest extends GetAllUsersSimplifiedQuerySchemaType {}

export interface GetAllUsersSimplifiedCaseResponse extends PaginatedResult<CustomUserWithSimplifiedDetails[]> {}
