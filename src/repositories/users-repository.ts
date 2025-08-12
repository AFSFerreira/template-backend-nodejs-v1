import type { Prisma } from '@prisma/client'
import type { AstrobiologyOrRelatedStartYearType } from '@/@types/astrobiology-or-related-start-year-type'
import type { BirthDateComparisonType } from '@/@types/birth-date-comparison-type'
import type { PaginationType } from '@/@types/pagination'
import type { UserWithDetails } from '@/@types/user-with-details'
import type { GetAllUsersSchemaType } from '@/http/schemas/user/get-all-users-schema'
import type { RegisterUserSchemaType } from '@/schemas/user/register-schema'

export type GetAllUsersQuery = Omit<GetAllUsersSchemaType, 'page' | 'limit'> &
  PaginationType &
  BirthDateComparisonType &
  AstrobiologyOrRelatedStartYearType

export interface CreateUserQuery {
  user: Omit<RegisterUserSchemaType['user'], 'password'> & {
    passwordHash: string
    profileImagePath: string
  }
  activityArea: RegisterUserSchemaType['activityArea']
  address: RegisterUserSchemaType['address']
  enrolledCourse: RegisterUserSchemaType['enrolledCourse']
  academicPublication: RegisterUserSchemaType['academicPublication']
  keyword: RegisterUserSchemaType['keyword']
  institution: RegisterUserSchemaType['institution']
}

export interface TokenData {
  recoveryPasswordToken: string
  recoveryPasswordTokenExpiresAt: Date
}

export interface FindByEmailOrUsernameQuery {
  email: string
  username: string
}

export interface GetAllUsersResponse {
  users: UserWithDetails[]
  totalItems: number
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
  listAllUsers: (query?: GetAllUsersQuery) => Promise<GetAllUsersResponse>
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
