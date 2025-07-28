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

export interface UsersRepository {
  create: (data: CreateUserQuery) => Promise<User>
  findBy: (where: Prisma.UserWhereInput) => Promise<UserWithDetails | null>
  findByEmailOrUsername: (
    emailOrUsername: string | [string | undefined, string | undefined],
  ) => Promise<UserWithDetails | null>
  listAllUsers: (query: GetAllUsersQuery) => Promise<UserWithDetails[]>
  incrementLoginAttempts: (publicId: string) => Promise<void>
  setLastLogin: (publicId: string) => Promise<void>
  delete: (publicId: string) => Promise<void>
  update: (
    publicId: string,
    data: Prisma.UserUpdateInput,
  ) => Promise<UserWithDetails>
}
