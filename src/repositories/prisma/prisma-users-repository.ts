import type { Prisma } from '@prisma/client'
import type {
  CreateUserQuery,
  GetAllUsersQuery,
  UsersRepository,
} from '../users-repository'
import type { ComparableType } from '@/@types/orderable-type'
import { userWithDetails } from '@/@types/user-with-details'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  static buildStartsWithFilter(value: any) {
    if (value === undefined) return undefined

    return { startsWith: value }
  }

  static buildComparableFilter(
    comparableType: ComparableType | undefined,
    value: any | undefined,
  ) {
    if (value === undefined || comparableType === undefined) return undefined

    return {
      [comparableType]: value,
    }
  }

  static buildIsFilter(fieldName: string, value: any) {
    if (value === undefined) return undefined

    return {
      is: {
        [fieldName]: value,
      },
    }
  }

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

  async findByEmailOrUsername(
    emailOrUsername: string | [string | undefined, string | undefined],
  ) {
    let orConditions: Array<{ email?: string; username?: string }> = []

    if (Array.isArray(emailOrUsername)) {
      const [val1, val2] = emailOrUsername

      if (val1 === undefined && val2 === undefined) return null

      if (val1 !== undefined) {
        orConditions.push({ email: val1 })
        orConditions.push({ username: val1 })
      }

      if (val2 !== undefined && val1 !== val2) {
        orConditions.push({ email: val2 })
        orConditions.push({ username: val2 })
      }
    } else {
      orConditions = [{ email: emailOrUsername }, { username: emailOrUsername }]
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: orConditions,
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
    const offset =
      query.limit !== undefined ? (query.page - 1) * query.limit : undefined

    const users = await prisma.user.findMany({
      include: userWithDetails.include,
      skip: offset,
      take: query.limit,
      orderBy: { createdAt: query.createdAtOrder },
      where: {
        fullName: PrismaUsersRepository.buildStartsWithFilter(query.fullName),
        username: PrismaUsersRepository.buildStartsWithFilter(query.username),
        institutionName: PrismaUsersRepository.buildStartsWithFilter(
          query.institutionName,
        ),
        departmentName: PrismaUsersRepository.buildStartsWithFilter(
          query.departmentName,
        ),
        specificActivity: PrismaUsersRepository.buildStartsWithFilter(
          query.specificActivity,
        ),
        birthdate: PrismaUsersRepository.buildComparableFilter(
          query.birthdateComparison,
          query.birthdate,
        ),
        astrobiologyOrRelatedStartYear:
          PrismaUsersRepository.buildComparableFilter(
            query.astrobiologyOrRelatedStartYearComparison,
            query.astrobiologyOrRelatedStartYear,
          ),

        receiveReports: query.receiveReports,
        occupation: query.occupation,
        educationLevel: query.educationLevel,
        role: query.role,
        activityArea: PrismaUsersRepository.buildIsFilter(
          'activityArea',
          query.activityArea,
        ),
        AND: query.keywords?.map((keywordValue) => ({
          keyword: {
            some: {
              value: {
                startsWith: keywordValue,
              },
            },
          },
        })),
      },
    })
    return users
  }

  async incrementLoginAttempts(publicId: string) {
    await prisma.user.update({
      where: {
        publicId,
      },
      data: {
        loginAttempts: {
          increment: 1,
        },
      },
    })
  }

  async setLastLogin(publicId: string) {
    await prisma.user.update({
      where: {
        publicId,
      },
      data: {
        lastLogin: new Date(),
      },
    })
  }

  async delete(publicId: string) {
    await prisma.user.delete({
      where: {
        publicId,
      },
    })
  }

  async update(publicId: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: { publicId },
      data,
      include: userWithDetails.include,
    })
    return user
  }
}
