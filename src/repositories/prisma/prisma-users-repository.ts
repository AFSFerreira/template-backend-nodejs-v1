import type { Prisma } from '@prisma/client'
import type { UsersRepository } from '../users-repository'
import { prisma } from '../../lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async setLastLogin(id: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        lastLogin: new Date(),
      },
    })
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: { id },
      data,
    })

    return user
  }

  async findBy(where: Prisma.UserWhereUniqueInput) {
    const user = await prisma.user.findFirst({
      where,
    })
    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }
}
