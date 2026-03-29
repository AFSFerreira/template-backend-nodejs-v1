import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllUsersSimplifiedQuerySchemaType } from '@custom-types/entrypoints/http/schemas/user/get-all-users-simplified-query-schema'
import type { User } from '@prisma/generated/client'

export interface GetAllUsersUseCaseRequest extends GetAllUsersSimplifiedQuerySchemaType {}

export interface GetAllUsersSimplifiedCaseResponse extends PaginatedResult<User[]> {}
