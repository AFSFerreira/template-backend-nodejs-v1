import type { Prisma } from '@prisma/client'
import type {
  CreateUserQuery,
  GetAllUsersQuery,
  UsersRepository,
} from '../users-repository'
import { userWithDetails } from '@/@types/user-with-details'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserQuery) {
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

  async findBy(where: Prisma.UserWhereInput) {
    const user = await prisma.user.findFirst({
      where,
      include: userWithDetails.include,
    })
    return user
  }

  async listAllUsers(query: GetAllUsersQuery) {
    const offset = query.limit !== undefined ? (query.page - 1) * query.limit : undefined    

    const users = await prisma.user.findMany({
      include: userWithDetails.include,
      skip: offset,
      take: query.limit,
      orderBy: [
        ...(query.birthDateComparison !== null
          ? [{ birthDate: query.birthDateComparison }]
          : []),
        ...(query.astrobiologyOrRelatedStartYearComparison !== null
          ? [
              {
                astrobiologyOrRelatedStartYear:
                  query.astrobiologyOrRelatedStartYearComparison,
              },
            ]
          : []),
      ],
      where: {
        ...(query.fullName !== null
          ? { fullName: { startsWith: query.fullName } }
          : {}),
        ...(query.username !== null
          ? { username: { startsWith: query.username } }
          : {}),
        ...(query.institutionName !== null
          ? { institutionName: { startsWith: query.institutionName } }
          : {}),
        ...(query.departmentName !== null
          ? { departmentName: { startsWith: query.departmentName } }
          : {}),
        ...(query.specificActivity !== null
          ? { specificActivity: { startsWith: query.specificActivity } }
          : {}),

        occupation: query.occupation,
        educationLevel: query.educationLevel,
        receiveReports: query.receiveReports,
        userRole: query.userRole,
        activityArea: {
          is: {
            mainAreaActivity: query.activityArea,
          },
        },
        AND: query.keywords?.map((keywordValue) => ({
          keyword: {
            some: {
              value: keywordValue,
            },
          },
        })),
      },
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
