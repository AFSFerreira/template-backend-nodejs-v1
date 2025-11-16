import type { CustomUserWithSimplifiedDetails } from '@custom-types/adapter/output/custom-user-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ChangeUserPasswordQuery } from '@custom-types/repositories/user/change-user-password-query'
import type { CreateUserQuery } from '@custom-types/repositories/user/create-user-query'
import type { FindByIdentityDocumentQuery } from '@custom-types/repositories/user/find-by-identity-document-query'
import type { FindConflictingUserQuery } from '@custom-types/repositories/user/find-conflicting-user-query'
import type { ListAllUsersDetailedQuery } from '@custom-types/repositories/user/list-all-users-detailed-query'
import type { ListAllUsersSimplifiedQuery } from '@custom-types/repositories/user/list-all-users-simplified-query'
import type { SetPasswordTokenQuery } from '@custom-types/repositories/user/set-password-token-query'
import type { UpdateUserQuery } from '@custom-types/repositories/user/update-user-query'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'
import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create: (data: CreateUserQuery) => Promise<UserWithDetails>
  findBy: (where: Prisma.UserWhereInput) => Promise<User | null>
  findUniqueBy: (where: Prisma.UserWhereUniqueInput) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  findByEmails: (email: string) => Promise<User | null>
  findByUsername: (username: string) => Promise<User | null>
  findById: (id: number) => Promise<UserWithDetails | null>
  findByPublicId: (publicId: string) => Promise<UserWithDetails | null>
  findByIdentityDocument: (query: FindByIdentityDocumentQuery) => Promise<User | null>
  findConflictingUser: (query: FindConflictingUserQuery) => Promise<User | null>
  listAllUsers: () => Promise<UserWithDetails[]>
  listAllUsersDetailed: (
    query?: ListAllUsersDetailedQuery,
  ) => Promise<PaginatedResult<CustomUserWithSimplifiedDetails[]>>
  listAllUsersSimplified: (
    query?: ListAllUsersSimplifiedQuery,
  ) => Promise<PaginatedResult<CustomUserWithSimplifiedDetails[]>>
  setLastLogin: (id: number) => Promise<void>
  incrementLoginAttempts: (id: number) => Promise<void>
  delete: (id: number) => Promise<void>
  update: (query: UpdateUserQuery) => Promise<UserWithDetails>
  validateUserToken: (recoveryPasswordTokenHash: string) => Promise<User | null>
  changePassword: (query: ChangeUserPasswordQuery) => Promise<User>
  setPasswordToken: (query: SetPasswordTokenQuery) => Promise<User>
}
