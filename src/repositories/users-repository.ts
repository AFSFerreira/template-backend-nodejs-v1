import type {
  EducationLevelType,
  OccupationType,
  Prisma,
  UserRoleType,
} from '@prisma/client'
import type { AstrobiologyOrRelatedStartYearType } from '@/@types/astrobiology-or-related-start-year-type'
import type { BirthDateComparisonType } from '@/@types/birth-date-comparison-type'
import type { OrderableType } from '@/@types/orderable-type'
import type { PaginationType } from '@/@types/pagination'
import type { UserWithDetails } from '@/@types/user-with-details'
import type { RegisterUserSchemaType } from '@/schemas/user/register-schema'

export type GetAllUsersQuery = {
  fullName?: string
  username?: string
  institutionName?: string
  departmentName?: string
  specificActivity?: string
  receiveReports?: boolean
  activityArea?: string
  keywords?: string[]
  role?: UserRoleType
  occupation?: OccupationType
  educationLevel?: EducationLevelType
  createdAtOrder?: OrderableType
} & PaginationType &
  BirthDateComparisonType &
  AstrobiologyOrRelatedStartYearType

export interface CreateUserQuery {
  user: Omit<RegisterUserSchemaType['user'], 'password'> & {
    passwordHash: string
    profileImagePath: string
  }
  mainAreaActivity: RegisterUserSchemaType['mainAreaActivity']
  address: RegisterUserSchemaType['address']
  enrolledCourse: RegisterUserSchemaType['enrolledCourse']
  academicPublications: RegisterUserSchemaType['academicPublications']
  keywords: RegisterUserSchemaType['keywords']
}

export interface TokenData {
  recoveryPasswordToken: string
  recoveryPasswordTokenExpiresAt: Date
}

export interface UsersRepository {
  create: (query: CreateUserQuery) => Promise<UserWithDetails>
  findByEmail: (email: string) => Promise<UserWithDetails | null>
  findByUsername: (username: string) => Promise<UserWithDetails | null>
  findById: (id: number) => Promise<UserWithDetails | null>
  findByPublicId: (publicId: string) => Promise<UserWithDetails | null>
  findByEmailOrUsername: (
    emailOrUsername: string,
    usernameOrEmail?: string,
  ) => Promise<UserWithDetails | null>
  listAllUsers: (query?: GetAllUsersQuery) => Promise<UserWithDetails[]>
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
