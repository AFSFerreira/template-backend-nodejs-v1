import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { PaginationType } from '@custom-types/pagination-type'
import type { UserWithDetails } from '@custom-types/user-with-details'
import type { Prisma } from '@prisma/client'
import type { GetAllUsersParamsSchemaType } from '@schemas/user/get-all-users-params-schema'
import type { RegisterUserBodySchemaType } from '@schemas/user/register-body-schema'

export type ListAllUsersQuery = Omit<
  GetAllUsersParamsSchemaType,
  'page' | 'limit'
> &
  PaginationType

export interface CreateUserQuery {
  user: Omit<RegisterUserBodySchemaType['user'], 'password'> & {
    passwordHash: string
    profileImage: string
  }
  activityArea: RegisterUserBodySchemaType['activityArea']
  address: RegisterUserBodySchemaType['address']
  enrolledCourse: RegisterUserBodySchemaType['enrolledCourse']
  academicPublication: RegisterUserBodySchemaType['academicPublication']
  keyword: RegisterUserBodySchemaType['keyword']
  institution: RegisterUserBodySchemaType['institution']
}

export interface TokenData {
  recoveryPasswordToken: string
  recoveryPasswordTokenExpiresAt: Date
}

export interface FindByEmailOrUsernameQuery {
  email: string
  username: string
}

export interface ListAllUsersResponse {
  data: UserWithDetails[]
  meta: PaginationMetaType
}

export interface UsersRepository {
  create: (query: CreateUserQuery) => Promise<UserWithDetails>
  findByEmail: (email: string) => Promise<UserWithDetails | null>
  findByUsername: (username: string) => Promise<UserWithDetails | null>
  findById: (id: number) => Promise<UserWithDetails | null>
  findByPublicId: (publicId: string) => Promise<UserWithDetails | null>
  findByEmailOrUsername: (
    data: FindByEmailOrUsernameQuery,
  ) => Promise<UserWithDetails | null>
  listAllUsers: (query?: ListAllUsersQuery) => Promise<ListAllUsersResponse>
  setLastLogin: (id: number) => Promise<void>
  incrementLoginAttempts: (id: number) => Promise<void>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.UserUpdateInput) => Promise<UserWithDetails>
  validateUserToken: (
    recoveryPasswordToken: string,
  ) => Promise<UserWithDetails | null>
  changePassword: (id: number, passwordHash: string) => Promise<UserWithDetails>
  setPasswordToken: (
    id: number,
    tokenData: TokenData,
  ) => Promise<UserWithDetails>
}
