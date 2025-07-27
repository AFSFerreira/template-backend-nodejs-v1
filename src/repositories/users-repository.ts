import type {
  EDUCATION_LEVEL,
  Keyword,
  OCCUPATION,
  Prisma,
  User,
  USER_ROLE,
} from '@prisma/client'
import type { UserWithDetails } from '@/@types/user-with-details'
import type { PaginationType } from '@/@types/pagination'

export interface CreateUserQuery {
  user: Prisma.UserUncheckedCreateInput
  keywords: Keyword[]
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
  birthDateComparison?: 'asc' | 'desc'
  astrobiologyOrRelatedStartYearComparison?: 'asc' | 'desc'
} & PaginationType

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
