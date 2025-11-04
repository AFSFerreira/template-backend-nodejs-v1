import type { CustomUserWithSimplifiedDetails } from '@custom-types/custom-user-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { UserWithDetails } from '@custom-types/user-with-details'
import type { EducationLevelType, IdentityType, OccupationType, Prisma, User } from '@prisma/client'
import type { getAllUsersDetailedQuerySchemaType } from '@schemas/user/get-all-users-detailed-query-schema'
import type { GetAllUsersSimplifiedQuerySchemaType } from '@schemas/user/get-all-users-simplified-query-schema'
import type { RegisterUserBodySchemaType } from '@schemas/user/register-body-schema'
import type { UpdateUserBodySchemaType } from '@schemas/user/update-user-body-schema'

export type ListAllUsersDetailedQuery = getAllUsersDetailedQuerySchemaType

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

export interface FindConflictingUserQuery {
  email: string
  username: string
  identity: {
    identityDocument: string
    identityType: IdentityType
  }
}

export interface FindByIdentityDocumentQuery {
  identityDocument: string
  identityType: IdentityType
}

export interface UpdateUserQuery {
  id: number
  data: UpdateUserBodySchemaType
}

export interface ChangeUserPasswordQuery {
  id: number
  passwordHash: string
}

export interface SetPasswordTokenQuery {
  id: number
  tokenData: {
    recoveryPasswordTokenHash: string
    recoveryPasswordTokenExpiresAt: Date
  }
}

export type ListAllUsersSimplifiedQuery = GetAllUsersSimplifiedQuerySchemaType

export interface UsersRepository {
  create: (data: CreateUserQuery) => Promise<UserWithDetails>
  findBy: (where: Prisma.UserWhereInput) => Promise<User | null>
  findUniqueBy: (where: Prisma.UserWhereUniqueInput) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
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
