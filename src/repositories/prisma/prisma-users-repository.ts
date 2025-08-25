import type { ComparableType } from '@custom-types/orderable-type'
import type { QueryMode } from '@custom-types/query-mode'
import { userWithDetails } from '@custom-types/user-with-details'
import { prisma } from '@lib/prisma'
import { ActivityAreaType } from '@prisma/client'
import type {
  EducationLevelType,
  IdentityType,
  OccupationType,
  Prisma,
} from '@prisma/client'
import type {
  CreateUserQuery,
  FindByEmailOrUsernameQuery,
  ListAllUsersQuery,
  TokenData,
  UsersRepository,
} from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  static buildStartsWithFilter(value: any) {
    if (!value) return undefined

    return { startsWith: value, mode: 'insensitive' as QueryMode }
  }

  static buildComparableFilter(
    comparableType: ComparableType | undefined,
    value: any | undefined,
  ) {
    if (!value || !comparableType) return undefined

    return {
      [comparableType]: value,
    }
  }

  static buildIsFilter(fieldName: string, value: any) {
    if (!value) return undefined

    return {
      is: {
        [fieldName]: value,
      },
    }
  }

  static buildGetAllUsersWhereInput(data: ListAllUsersQuery) {
    return {
      fullName: PrismaUsersRepository.buildStartsWithFilter(data.fullName),
      email: PrismaUsersRepository.buildStartsWithFilter(data.email),
      username: PrismaUsersRepository.buildStartsWithFilter(data.username),
      departmentName: PrismaUsersRepository.buildStartsWithFilter(
        data.departmentName,
      ),
      birthdate: PrismaUsersRepository.buildComparableFilter(
        data.birthdateComparison,
        data.birthdate,
      ),
      astrobiologyOrRelatedStartYear:
        PrismaUsersRepository.buildComparableFilter(
          data.astrobiologyOrRelatedStartYearComparison,
          data.astrobiologyOrRelatedStartYear,
        ),
      ActivityArea: {
        area: PrismaUsersRepository.buildStartsWithFilter(data.activityArea),
        type: ActivityAreaType.AREA_OF_ACTIVITY,
      },
      Institution: {
        name: PrismaUsersRepository.buildStartsWithFilter(data.institutionName),
      },
      receiveReports: data.receiveReports,
      occupation: data.occupation,
      educationLevel: data.educationLevel,
      role: data.role,
      membershipStatus: data.membershipStatus,
      AND: data.keywords?.map((keyword) => ({
        Keyword: {
          some: {
            value: PrismaUsersRepository.buildStartsWithFilter(keyword),
          },
        },
      })),
    }
  }

  async create(query: CreateUserQuery) {
    const user = await prisma.user.create({
      data: {
        ...query.user,
        occupation: query.user.occupation as OccupationType,
        educationLevel: query.user.educationLevel as EducationLevelType,
        identityType: query.user.identityType as IdentityType,
        Address: {
          create: query.address,
        },
        EnrolledCourse: {
          create: query.enrolledCourse,
        },
        Institution: {
          connectOrCreate: {
            create: { name: query.institution.name },
            where: { name: query.institution.name },
          },
        },
        AcademicPublication: {
          create: query.academicPublication.map((academicPublication) => {
            const { tag, ...filteredAcademicPublicationData } =
              academicPublication
            return {
              ...filteredAcademicPublicationData,
              ActivityArea: {
                connect: {
                  type_area: {
                    area: academicPublication.tag,
                    type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
                  },
                },
              },
            }
          }),
        },
        Keyword: {
          create: query.keyword?.map((value: string) => ({
            value,
          })),
        },
        ActivityArea: {
          connect: {
            type_area: {
              area: query.activityArea.mainActivityArea,
              type: ActivityAreaType.AREA_OF_ACTIVITY,
            },
          },
        },
        SubActivityArea: {
          connect: {
            type_area: {
              area: query.activityArea.subActivityArea,
              type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
            },
          },
        },
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

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: userWithDetails.include,
    })
    return user
  }

  async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
      include: userWithDetails.include,
    })
    return user
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: userWithDetails.include,
    })
    return user
  }

  async findByPublicId(publicId: string) {
    const user = await prisma.user.findUnique({
      where: { publicId },
      include: userWithDetails.include,
    })
    return user
  }

  async setLastLogin(id: number) {
    await prisma.user.update({
      where: { id },
      data: {
        lastLogin: new Date(),
      },
    })
  }

  async findByEmailOrUsername({ email, username }: FindByEmailOrUsernameQuery) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
      include: userWithDetails.include,
    })

    return user
  }

  async listAllUsers(query?: ListAllUsersQuery) {
    if (!query?.page || !query?.limit) {
      const users = await prisma.user.findMany({
        include: userWithDetails.include,
      })
      return {
        data: users,
        meta: {
          totalItems: users.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: users.length,
        },
      }
    }

    const offset = (query.page - 1) * query.limit

    const where = PrismaUsersRepository.buildGetAllUsersWhereInput(query)

    const [totalItems, users] = await prisma.$transaction([
      prisma.user.count({
        where,
      }),
      prisma.user.findMany({
        include: userWithDetails.include,
        skip: offset,
        take: query.limit,
        orderBy: { createdAt: query.createdAtOrder },
        where,
      }),
    ])

    const totalPages = Math.ceil(totalItems / query.limit)

    return {
      data: users,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize: query.limit,
      },
    }
  }

  async incrementLoginAttempts(id: number) {
    await prisma.user.update({
      where: { id },
      data: {
        loginAttempts: {
          increment: 1,
        },
      },
    })
  }

  async delete(id: number) {
    await prisma.user.delete({
      where: { id },
    })
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: { id },
      data,
      include: userWithDetails.include,
    })
    return user
  }

  async validateUserToken(recoveryPasswordToken: string) {
    const user = await prisma.user.findFirst({
      where: {
        recoveryPasswordToken,
        recoveryPasswordTokenExpiresAt: {
          gte: new Date(),
        },
      },
      include: userWithDetails.include,
    })
    return user
  }

  async changePassword(id: number, passwordHash: string) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        passwordHash,
        recoveryPasswordToken: null,
        recoveryPasswordTokenExpiresAt: null,
      },
      include: userWithDetails.include,
    })
    return user
  }

  async setPasswordToken(id: number, tokenData: TokenData) {
    const user = await prisma.user.update({
      where: { id },
      data: { ...tokenData },
      include: userWithDetails.include,
    })
    return user
  }
}
