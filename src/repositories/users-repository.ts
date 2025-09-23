import type { CustomUserWithSimplifiedDetails } from '@custom-types/custom-user-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { UserWithDetails } from '@custom-types/user-with-details'
import type { EducationLevelType, IdentityType, OccupationType, Prisma, User } from '@prisma/client'
import type { getAllUsersDetailedQuerySchemaType } from '@schemas/user/get-all-users-detailed-query-schema'
import type { GetAllUsersSimplifiedQuerySchemaType } from '@schemas/user/get-all-users-simplified-query-schema'
import type { RegisterUserBodySchemaType } from '@schemas/user/register-body-schema'

export type ListAllUsersQuery = getAllUsersDetailedQuerySchemaType

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

export type ListAllUsersSimplified = GetAllUsersSimplifiedQuerySchemaType

export interface UsersRepository {
  create: (data: CreateUserQuery) => Promise<UserWithDetails>
  checkIfAvailable: (where: Prisma.UserWhereUniqueInput) => Promise<boolean>
  findBy: (where: Prisma.UserWhereInput) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  findByUsername: (username: string) => Promise<User | null>
  findById: (id: number) => Promise<UserWithDetails | null>
  findByPublicId: (publicId: string) => Promise<UserWithDetails | null>
  findByIdentityDocument: (data: FindByIdentityDocumentQuery) => Promise<User | null>
  findByEmailOrUsername: (data: FindByEmailOrUsernameQuery) => Promise<User | null>
  listAllUsers: () => Promise<UserWithDetails[]>
  listAllUsersDetailed: (query?: ListAllUsersQuery) => Promise<PaginatedResult<CustomUserWithSimplifiedDetails[]>>
  listAllUsersSimplified: (
    query?: ListAllUsersSimplified,
  ) => Promise<PaginatedResult<CustomUserWithSimplifiedDetails[]>>
  setLastLogin: (id: number) => Promise<void>
  incrementLoginAttempts: (id: number) => Promise<void>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.UserUpdateInput) => Promise<UserWithDetails>
  validateUserToken: (recoveryPasswordTokenHash: string) => Promise<User | null>
  changePassword: (id: number, passwordHash: string) => Promise<User>
  setPasswordToken: (id: number, tokenData: TokenData) => Promise<User>
}
