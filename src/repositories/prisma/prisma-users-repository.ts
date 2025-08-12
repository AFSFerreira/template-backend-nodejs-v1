import type {
  EducationLevelType,
  IdentityType,
  OccupationType,
  Prisma,
} from '@prisma/client'
import { ActivityAreaType } from '@prisma/client'
import type {
  CreateUserQuery,
  FindByEmailOrUsernameQuery,
  GetAllUsersQuery,
  TokenData,
  UsersRepository,
} from '../users-repository'
import type { ComparableType } from '@/@types/orderable-type'
import type { QueryMode } from '@/@types/query-mode'
import { userWithDetails } from '@/@types/user-with-details'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  static buildStartsWithFilter(value: any) {
    if (value === undefined) return undefined

    return { startsWith: value, mode: 'insensitive' as QueryMode }
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

  static buildGetAllUsersWhereInput(data: GetAllUsersQuery) {
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
          connect: {
            name: query.institution.name,
          },
        },
        AcademicPublication: {
          create: query.academicPublication.map((academicPublication) => ({
            ...academicPublication,
            ActivityArea: {
              connect: {
                type_area: {
                  area: academicPublication.tag,
                  type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
                },
              },
            },
          })),
        },
        Keyword: {
          create: query.keyword?.map((value: string) => ({
            value,
          })),
        },
        ActivityArea: {
          connect: {
            type_area: {
              area: query.activityArea.activityArea,
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

  async listAllUsers(query?: GetAllUsersQuery) {
    if (query === undefined) {
      const users = await prisma.user.findMany({
        include: userWithDetails.include,
      })
      const totalItems = users.length
      return { users, totalItems }
    }

    const offset =
      query.limit !== undefined ? (query.page - 1) * query.limit : undefined

    const [totalItems, users] = await prisma.$transaction([
      prisma.user.count({
        where: PrismaUsersRepository.buildGetAllUsersWhereInput(query),
      }),
      prisma.user.findMany({
        include: userWithDetails.include,
        skip: offset,
        take: query.limit,
        orderBy: { createdAt: query.createdAtOrder },
        where: PrismaUsersRepository.buildGetAllUsersWhereInput(query),
      }),
    ])

    return { users, totalItems }
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
