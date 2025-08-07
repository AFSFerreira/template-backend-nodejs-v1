import type {
  EducationLevel,
  Keyword,
  Occupation,
  Prisma,
  User,
  UserRole,
} from '@prisma/client'
import type { ComparableType, OrderableType } from '@/@types/orderable-type'
import type { PaginationType } from '@/@types/pagination'
import type { UserWithDetails } from '@/@types/user-with-details'

type BirthDateComparisonType =
  | { birthdate: Date; birthdateComparison: ComparableType }
  | { birthdate?: Date; birthdateComparison?: ComparableType }

type AstrobiologyOrRelatedStartYearType =
  | {
      astrobiologyOrRelatedStartYear: number
      astrobiologyOrRelatedStartYearComparison: ComparableType
    }
  | {
      astrobiologyOrRelatedStartYear?: number
      astrobiologyOrRelatedStartYearComparison?: ComparableType
    }

export type GetAllUsersQuery = {
  fullName?: string
  username?: string
  institutionName?: string
  departmentName?: string
  specificActivity?: string
  receiveReports?: boolean
  activityArea?: string
  keywords?: string[]
  role?: UserRole
  occupation?: Occupation
  educationLevel?: EducationLevel
  createdAtOrder?: OrderableType
} & PaginationType &
  BirthDateComparisonType &
  AstrobiologyOrRelatedStartYearType

export interface CreateUserQuery {
  user: Prisma.UserUncheckedCreateInput
  keywords: Keyword[]
}

export interface TokenData {
  recoveryPasswordToken: string
  recoveryPasswordTokenExpiresAt: Date
}

export interface UsersRepository {
  create: (data: CreateUserQuery) => Promise<User>
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
