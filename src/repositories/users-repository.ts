import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create: (data: Prisma.UserUncheckedCreateInput) => Promise<User>
  createUserWithKeywords: (
    data: Prisma.UserUncheckedCreateInput,
    keywordIds: string[],
  ) => Promise<User>
  findById: (id: string) => Promise<User | null>
  findBy: (where: Prisma.UserWhereUniqueInput) => Promise<User | null>
  setLastLogin: (id: string) => Promise<void>
  updateLoginAttempts: (id: string) => Promise<void>
  delete: (id: string) => Promise<void>
  update: (id: string, data: Prisma.UserUpdateInput) => Promise<User>
}
