import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllUsersQuerySchemaType } from '@custom-types/entrypoints/http/schemas/user/get-all-users-query-schema'
import type { User } from '@prisma/generated/client'

export interface GetAllUsersUseCaseRequest extends GetAllUsersQuerySchemaType {}

export interface GetAllUsersCaseResponse extends PaginatedResult<User[]> {}
