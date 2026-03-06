import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { CustomUserWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/user-simplified'
import type { ChangeUserPasswordQuery } from '@custom-types/repository/prisma/user/change-user-password-query'
import type { ConfirmEmailChangeQuery } from '@custom-types/repository/prisma/user/confirm-email-change-query'
import type { CreateUserQuery } from '@custom-types/repository/prisma/user/create-user-query'
import type { FindByIdentityDocumentQuery } from '@custom-types/repository/prisma/user/find-by-identity-document-query'
import type { FindConflictingUserQuery } from '@custom-types/repository/prisma/user/find-conflicting-user-query'
import type { ListAllUsersDetailedQuery } from '@custom-types/repository/prisma/user/list-all-users-detailed-query'
import type { ListAllUsersSimplifiedQuery } from '@custom-types/repository/prisma/user/list-all-users-simplified-query'
import type { ListExpiredVerifyingUsersQuery } from '@custom-types/repository/prisma/user/list-expired-verifying-users-query'
import type { SetEmailChangeTokenQuery } from '@custom-types/repository/prisma/user/set-email-change-token-query'
import type { SetPasswordTokenQuery } from '@custom-types/repository/prisma/user/set-password-token-query'
import type { StreamAllUsersQuery } from '@custom-types/repository/prisma/user/stream-all-users-query'
import type { UpdateRoleQuery } from '@custom-types/repository/prisma/user/update-role-query'
import type { UpdateUserQuery } from '@custom-types/repository/prisma/user/update-user-query'
import type { HashedToken } from '@custom-types/services/hashes/hashed-token'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type { Prisma, User } from '@prisma/generated/client'

export interface UsersRepository {
  create: (data: CreateUserQuery) => Promise<UserWithDetails>
  findBy: (where: Prisma.UserWhereInput) => Promise<User | null>
  findUniqueBy: (where: Prisma.UserWhereUniqueInput) => Promise<User | null>
  findByPrimaryEmail: (email: string) => Promise<User | null>
  findByEmails: (email: string) => Promise<User | null>
  findByUsername: (username: string) => Promise<User | null>
  findById: (id: number) => Promise<UserWithDetails | null>
  findByPublicId: (publicId: string) => Promise<UserWithDetails | null>
  findByIdentityDocument: (query: FindByIdentityDocumentQuery) => Promise<User | null>
  findConflictingUser: (query: FindConflictingUserQuery) => Promise<User | null>
  streamAllUsers: (query?: StreamAllUsersQuery) => AsyncIterable<UserWithDetails>
  listAllUsersDetailed: (
    query: ListAllUsersDetailedQuery,
  ) => Promise<PaginatedResult<CustomUserWithSimplifiedDetails[]>>
  listAllUsersSimplified: (
    query: ListAllUsersSimplifiedQuery,
  ) => Promise<PaginatedResult<CustomUserWithSimplifiedDetails[]>>
  totalCount: (where?: Prisma.UserWhereInput) => Promise<number>
  setLastLogin: (id: number) => Promise<void>
  incrementLoginAttempts: (id: number) => Promise<void>
  resetLoginAttempts: (id: number) => Promise<void>
  delete: (id: number) => Promise<void>
  update: (query: UpdateUserQuery) => Promise<UserWithDetails>
  updateRole: (query: UpdateRoleQuery) => Promise<void>
  validateUserToken: (recoveryPasswordTokenHash: HashedToken) => Promise<User | null>
  validateEmailVerificationToken: (emailVerificationTokenHash: HashedToken) => Promise<User | null>
  confirmEmailVerification: (id: number) => Promise<User>
  changePassword: (query: ChangeUserPasswordQuery) => Promise<User>
  upgradePasswordHash: (query: ChangeUserPasswordQuery) => Promise<void>
  setPasswordToken: (query: SetPasswordTokenQuery) => Promise<User>
  setEmailChangeToken: (query: SetEmailChangeTokenQuery) => Promise<User>
  confirmEmailChange: (query: ConfirmEmailChangeQuery) => Promise<User>
  listExpiredVerifyingUsers: (query: ListExpiredVerifyingUsersQuery) => Promise<number[]>
  deleteManyById: (ids: number[]) => Promise<number>
}
