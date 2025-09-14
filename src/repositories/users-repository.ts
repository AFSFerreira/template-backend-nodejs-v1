import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { PaginationType } from '@custom-types/pagination-type'
import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UserWithSimplifiedDetails } from '@custom-types/user-with-simplified-details'
import type { EducationLevelType, IdentityType, OccupationType, Prisma } from '@prisma/client'
import type { getAllUsersDetailedQuerySchemaType } from '@schemas/user/get-all-users-detailed-query-schema'
import type { RegisterUserBodySchemaType } from '@schemas/user/register-body-schema'

export type ListAllUsersQuery = Omit<getAllUsersDetailedQuerySchemaType, 'page' | 'limit'> &
  PaginationType & { simplified?: boolean }

export interface CreateUserQuery {
  user: Omit<RegisterUserBodySchemaType['user'], 'password' | 'occupation' | 'educationLevel' | 'identity'> & {
    passwordHash: string
    educationLevel: EducationLevelType
    profileImage: string
    occupation?: OccupationType
    identityType: IdentityType
    identityDocument: string
  }
  activityArea: RegisterUserBodySchemaType['activityArea']
  address: RegisterUserBodySchemaType['address']
  enrolledCourse: RegisterUserBodySchemaType['enrolledCourse']
  academicPublication: RegisterUserBodySchemaType['academicPublication']
  keyword: RegisterUserBodySchemaType['keyword']
  institution: RegisterUserBodySchemaType['institution']
}

export interface TokenData {
  recoveryPasswordTokenHash: string
  recoveryPasswordTokenExpiresAt: Date
}

export interface FindByEmailOrUsernameQuery {
  email: string
  username: string
}

export interface FindByIdentityDocumentQuery {
  identityDocument: string
  identityType: IdentityType
}

export interface UsersRepository {
  create: (query: CreateUserQuery) => Promise<UserWithDetails>
  checkIfAvailable: (where: Prisma.UserWhereUniqueInput) => Promise<boolean>
  findBy: (where: Prisma.UserWhereInput) => Promise<UserWithDetails | null>
  findByEmail: (email: string) => Promise<UserWithDetails | null>
  findByUsername: (username: string) => Promise<UserWithDetails | null>
  findById: (id: number) => Promise<UserWithDetails | null>
  findByPublicId: (publicId: string) => Promise<UserWithDetails | null>
  findByIdentityDocument: (data: FindByIdentityDocumentQuery) => Promise<UserWithDetails | null>
  findByEmailOrUsername: (data: FindByEmailOrUsernameQuery) => Promise<UserWithDetails | null>
  listAllUsers: (
    query?: ListAllUsersQuery,
  ) => Promise<PaginatedResult<Array<UserWithDetails | UserWithSimplifiedDetails>>>
  setLastLogin: (id: number) => Promise<void>
  incrementLoginAttempts: (id: number) => Promise<void>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.UserUpdateInput) => Promise<UserWithDetails>
  validateUserToken: (recoveryPasswordTokenHash: string) => Promise<UserWithDetails | null>
  changePassword: (id: number, passwordHash: string) => Promise<UserWithDetails>
  setPasswordToken: (id: number, tokenData: TokenData) => Promise<UserWithDetails>
}
