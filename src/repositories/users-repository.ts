import type { Keyword, Prisma, User } from '@prisma/client'

export interface ICreateUser {
  user: Prisma.UserUncheckedCreateInput,
  keywords: Keyword[],
}

export interface UsersRepository {
  create: (data: ICreateUser) => Promise<User>
  findById: (id: string) => Promise<User | null>
  findBy: (where: Prisma.UserWhereUniqueInput) => Promise<User | null>
  setLastLogin: (id: string) => Promise<void>
  updateLoginAttempts: (id: string) => Promise<void>
  delete: (id: string) => Promise<void>
  update: (id: string, data: Prisma.UserUpdateInput) => Promise<User>
}
