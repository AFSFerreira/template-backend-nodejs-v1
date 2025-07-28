import type {
  EDUCATION_LEVEL,
  Keyword,
  OCCUPATION,
  Prisma,
  User,
  USER_ROLE,
} from '@prisma/client'
import type { OrderableType } from '@/@types/orderable-type'
import type { PaginationType } from '@/@types/pagination'
import type { PrismaComparisonType } from '@/@types/prisma-comparison'
import type { UserWithDetails } from '@/@types/user-with-details'

export interface CreateUserQuery {
  user: Prisma.UserUncheckedCreateInput
  keywords: Keyword[]
}

type BirthDateComparisonType =
  | { birthdate: Date; birthdateComparison: PrismaComparisonType }
  | { birthdate?: Date; birthdateComparison?: PrismaComparisonType }

type AstrobiologyOrRelatedStartYearType =
  | {
      astrobiologyOrRelatedStartYear: number
      astrobiologyOrRelatedStartYearComparison: PrismaComparisonType
    }
  | {
      astrobiologyOrRelatedStartYear?: number
      astrobiologyOrRelatedStartYearComparison?: PrismaComparisonType
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
  userRole?: USER_ROLE
  occupation?: OCCUPATION
  educationLevel?: EDUCATION_LEVEL
  createdAtOrder: OrderableType
} & PaginationType &
  BirthDateComparisonType &
  AstrobiologyOrRelatedStartYearType

export interface UsersRepository {
  create: (data: CreateUserQuery) => Promise<User>
  findBy: (where: Prisma.UserWhereInput) => Promise<UserWithDetails | null>
  findByEmailOrUsername: (
    emailOrUsername: string,
  ) => Promise<UserWithDetails | null>
  listAllUsers: (query: GetAllUsersQuery) => Promise<UserWithDetails[]>
  incrementLoginAttempts: (id: string) => Promise<void>
  setLastLogin: (id: string) => Promise<void>
  delete: (id: string) => Promise<void>
  update: (id: string, data: Prisma.UserUpdateInput) => Promise<UserWithDetails>
}
