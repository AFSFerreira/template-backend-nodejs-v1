import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ChangeUserPasswordQuery } from '@custom-types/repository/prisma/user/change-user-password-query'
import type { CreateUserQuery } from '@custom-types/repository/prisma/user/create-user-query'
import type { FindConflictingUserQuery } from '@custom-types/repository/prisma/user/find-conflicting-user-query'
import type { ListAllUsersQuery } from '@custom-types/repository/prisma/user/list-all-users-query'
import type { SetPasswordTokenQuery } from '@custom-types/repository/prisma/user/set-password-token-query'
import type { UpdateUserQuery } from '@custom-types/repository/prisma/user/update-user-query'
import type { HashedToken } from '@custom-types/services/hashes/hashed-token'
import type { Prisma, User } from '@prisma/generated/client'

export interface UsersRepository {
  create: (data: CreateUserQuery) => Promise<User>
  findBy: (where: Prisma.UserWhereInput) => Promise<User | null>
  findUniqueBy: (where: Prisma.UserWhereUniqueInput) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  findByUsername: (username: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
  findConflictingUser: (query: FindConflictingUserQuery) => Promise<User | null>
  listAllUsers: (query: ListAllUsersQuery) => Promise<PaginatedResult<User[]>>
  totalCount: (where?: Prisma.UserWhereInput) => Promise<number>
  setLastLogin: (id: string) => Promise<void>
  incrementLoginAttempts: (id: string) => Promise<void>
  resetLoginAttempts: (id: string) => Promise<void>
  delete: (id: string) => Promise<void>
  update: (query: UpdateUserQuery) => Promise<User>
  validateUserToken: (recoveryPasswordTokenHash: HashedToken) => Promise<User | null>
  validateEmailVerificationToken: (emailVerificationTokenHash: HashedToken) => Promise<User | null>
  confirmEmailVerification: (id: string) => Promise<User>
  changePassword: (query: ChangeUserPasswordQuery) => Promise<User>
  upgradePasswordHash: (query: ChangeUserPasswordQuery) => Promise<void>
  setPasswordToken: (query: SetPasswordTokenQuery) => Promise<User>
}
