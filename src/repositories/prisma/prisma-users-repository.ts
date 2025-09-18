import type { CustomUserWithSimplifiedDetails } from '@custom-types/custom-user-with-simplified-details-type'
import type { ComparableType } from '@custom-types/orderable-type'
import type { QueryMode } from '@custom-types/query-mode'
import { userWithDetails } from '@custom-types/user-with-details'
import { userWithSimplifiedDetails } from '@custom-types/user-with-simplified-details'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { ActivityAreaType } from '@prisma/client'
import { buildListAllUsersSimplifiedQuery } from '@repositories/prisma/queries/users/build-list-all-users-simplified-query'
import type {
  CreateUserQuery,
  FindByEmailOrUsernameQuery,
  FindByIdentityDocumentQuery,
  ListAllUsersQuery,
  ListAllUsersSimplified,
  TokenData,
  UsersRepository,
} from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  static buildInsensitiveMode(value: string | undefined) {
    if (!value) return undefined

    return {
      equals: value,
      mode: 'insensitive' as QueryMode,
    }
  }

  static buildStartsWithFilter(value: string | undefined) {
    if (!value) return undefined

    return {
      startsWith: value,
      mode: 'insensitive' as QueryMode,
    }
  }

  static buildComparableFilter(comparableType: ComparableType | undefined, value: any) {
    if (!value || !comparableType) return undefined

    return {
      [comparableType]: value,
    }
  }

  static buildIsFilter(fieldName: string, value: string | undefined) {
    if (!value) return undefined

    return {
      is: {
        [fieldName]: value,
        mode: 'insensitive' as QueryMode,
      },
    }
  }

  static buildGetAllUsersWhereInput(data: Omit<ListAllUsersQuery, 'simplified'>): Prisma.UserWhereInput {
    return {
      fullName: PrismaUsersRepository.buildStartsWithFilter(data.fullName),
      email: PrismaUsersRepository.buildStartsWithFilter(data.email),
      username: PrismaUsersRepository.buildStartsWithFilter(data.username),

      departmentName: PrismaUsersRepository.buildStartsWithFilter(data.departmentName),

      birthdate: PrismaUsersRepository.buildComparableFilter(data.birthdateComparison, data.birthdate),

      astrobiologyOrRelatedStartYear: PrismaUsersRepository.buildComparableFilter(
        data.astrobiologyOrRelatedStartYearComparison,
        data.astrobiologyOrRelatedStartYear,
      ),

      receiveReports: data.receiveReports,
      occupation: data.occupation,
      educationLevel: data.educationLevel,
      role: data.role,
      membershipStatus: data.membershipStatus,

      AND: data.keywords?.map((keyword) => ({
        Keyword: {
          some: {
            value: PrismaUsersRepository.buildInsensitiveMode(keyword),
          },
        },
      })),

      Address: {
        state: PrismaUsersRepository.buildInsensitiveMode(data.state),
      },

      Institution: {
        name: PrismaUsersRepository.buildInsensitiveMode(data.institutionName),
      },

      ActivityArea: {
        OR: [
          {
            area: PrismaUsersRepository.buildInsensitiveMode(data.mainActivityArea),
            type: ActivityAreaType.AREA_OF_ACTIVITY,
          },
          {
            area: PrismaUsersRepository.buildInsensitiveMode(data.subActivityArea),
            type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
          },
        ],
      },
    }
  }

  async create(query: CreateUserQuery) {
    const keywordsConnectOrCreateData = query.keyword
      ? {
          connectOrCreate: query.keyword.map((value: string) => ({
            where: { value },
            create: { value },
          })),
        }
      : undefined

    const academicPublicationCreateData = query.academicPublication
      ? {
          create: query.academicPublication.map((academicPublication) => {
            const { area, ...filteredAcademicPublicationData } = academicPublication
            return {
              ...filteredAcademicPublicationData,
              ActivityArea: {
                connect: {
                  type_area: {
                    area,
                    type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
                  },
                },
              },
            }
          }),
        }
      : undefined

    const enrolledCourseCreateData = query.enrolledCourse
      ? {
          create: query.enrolledCourse,
        }
      : undefined

    const institutionConnectOrCreateData = query.institution
      ? {
          connectOrCreate: {
            create: { name: query.institution.name },
            where: { name: query.institution.name },
          },
        }
      : undefined

    const activityAreaConnectData = query.activityArea
      ? {
          connect: {
            type_area: {
              area: query.activityArea.mainActivityArea,
              type: ActivityAreaType.AREA_OF_ACTIVITY,
            },
          },
        }
      : undefined

    const subActivityAreaConnectData = query.activityArea
      ? {
          connect: {
            type_area: {
              area: query.activityArea.subActivityArea,
              type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
            },
          },
        }
      : undefined

    const addressCreateData = {
      create: query.address,
    }

    const user = await prisma.user.create({
      data: {
        ...query.user,
        Address: addressCreateData,
        EnrolledCourse: enrolledCourseCreateData,
        Institution: institutionConnectOrCreateData,
        AcademicPublication: academicPublicationCreateData,
        Keyword: keywordsConnectOrCreateData,
        ActivityArea: activityAreaConnectData,
        SubActivityArea: subActivityAreaConnectData,
      },
      include: userWithDetails.include,
    })

    return user
  }

  async checkIfAvailable(where: Prisma.UserWhereUniqueInput) {
    const user = await prisma.user.findUnique({ where })
    return !!user
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

  async findByIdentityDocument(data: FindByIdentityDocumentQuery) {
    const user = await prisma.user.findUnique({
      where: { identityType_identityDocument: data },
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
    const simplified = query?.simplified ?? false

    if (!query?.page || !query?.limit) {
      const users = await prisma.user.findMany({
        include: simplified ? userWithSimplifiedDetails.include : userWithDetails.include,
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

    const [totalItems, users] = await prisma.$transaction(async (prismaTx) => {
      const totalItems = await prismaTx.user.count({
        where,
      })

      const users = await prismaTx.user.findMany({
        where,
        skip: offset,
        take: query.limit,
        orderBy: { createdAt: query.createdAtOrder },
        include: simplified ? userWithSimplifiedDetails.include : userWithDetails.include,
      })

      return [totalItems, users]
    })

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

  async listAllUsersSimplified(query?: ListAllUsersSimplified) {
    if (!query?.page || !query?.limit) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          publicId: true,
          fullName: true,
          username: true,
          email: true,
          emailIsPublic: true,
          Institution: {
            select: { name: true },
          },
          Address: {
            select: { state: true },
          },
        },
      })

      const formattedUsers = users.map((userInfo) => {
        const { Address, Institution, ...filteredUserInfo } = userInfo
        return {
          ...filteredUserInfo,
          public_id: userInfo.publicId,
          full_name: userInfo.fullName,
          email_is_public: userInfo.emailIsPublic,
          institution_name: Institution.name,
          state: Address.state,
        }
      })

      return {
        data: formattedUsers,
        meta: {
          totalItems: formattedUsers.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: formattedUsers.length,
        },
      }
    }

    const { searchQuery, countQuery } = buildListAllUsersSimplifiedQuery(query)

    const [countResult, users] = await Promise.all([
      prisma.$queryRaw<Array<{ total: number }>>(countQuery),
      prisma.$queryRaw<CustomUserWithSimplifiedDetails[]>(searchQuery),
    ])

    const totalItems = countResult[0].total

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

  async validateUserToken(recoveryPasswordTokenHash: string) {
    const user = await prisma.user.findFirst({
      where: { recoveryPasswordTokenHash },
      include: userWithDetails.include,
    })
    return user
  }

  async changePassword(id: number, passwordHash: string) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        passwordHash,
        recoveryPasswordTokenHash: null,
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
