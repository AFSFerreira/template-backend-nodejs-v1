import type { UserWithDetails } from '@/@types/user-with-details'
import type { Keyword, Prisma, User } from '@prisma/client'

export interface CreateUser {
  user: Prisma.UserUncheckedCreateInput
  keywords: Keyword[]
}

export interface UsersRepository {
  create: (data: CreateUser) => Promise<User>
  findBy: (
    where: Prisma.UserWhereUniqueInput,
  ) => Promise<UserWithDetails | null>
  findById: (id: string) => Promise<UserWithDetails | null>
  findByEmailOrUsername: (
    emailOrUsername: string,
  ) => Promise<UserWithDetails | null>
  listAllUsers: () => Promise<UserWithDetails[]>
  incrementLoginAttempts: (id: string) => Promise<void>
  setLastLogin: (id: string) => Promise<void>
  delete: (id: string) => Promise<void>
  update: (id: string, data: Prisma.UserUpdateInput) => Promise<UserWithDetails>
}
