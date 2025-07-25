import type { Prisma } from '@prisma/client'
import type { CreateUser, UsersRepository } from '../users-repository'
import { userWithDetails } from '@/@types/user-with-details'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUser) {
    const user = await prisma.user.create({
      data: {
        ...data.user,
        keyword: {
          connect: data.keywords.map((keyword) => ({ id: keyword.id })),
        },
      },
    })
    return user
  }

  async findByEmailOrUsername(emailOrUsername: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
      include: userWithDetails.include,
    })
    return user
  }

  async findBy(where: Prisma.UserWhereUniqueInput) {
    const user = await prisma.user.findFirst({
      where,
      include: userWithDetails.include,
    })
    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: userWithDetails.include,
    })
    return user
  }

  async listAllUsers() {
    const users = await prisma.user.findMany({
      include: userWithDetails.include,
    })
    return users
  }

  async incrementLoginAttempts(id: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        loginAttempts: {
          increment: 1,
        },
      },
    })
  }

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
      include: userWithDetails.include,
    })
    return user
  }
}
