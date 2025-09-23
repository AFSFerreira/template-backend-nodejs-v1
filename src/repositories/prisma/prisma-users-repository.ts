import type { CustomUserWithSimplifiedDetailsRaw } from '@custom-types/custom-user-with-simplified-details-raw-type'
import { userWithDetails } from '@custom-types/user-with-details'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { ActivityAreaType } from '@prisma/client'
import { customUserSimplifiedAdapter } from '@repositories/prisma/adapters/custom-user-simplified-adapter'
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
import { buildListAllUsersDetailedQuery } from './queries/users/build-list-all-users-detailed-query'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserQuery) {
    const keywordsConnectOrCreateData = data.keyword
      ? {
          connectOrCreate: data.keyword.map((value: string) => ({
            where: { value },
            create: { value },
          })),
        }
      : undefined

    const academicPublicationCreateData = data.academicPublication
      ? {
          create: data.academicPublication.map((academicPublication) => {
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

    const enrolledCourseCreateData = data.enrolledCourse
      ? {
          create: {
            ...data.enrolledCourse,
            scholarshipHolder: data.enrolledCourse.scholarshipHolder ?? false,
          },
        }
      : undefined

    const institutionConnectOrCreateData = data.institution
      ? {
          connectOrCreate: {
            create: { name: data.institution.name },
            where: { name: data.institution.name },
          },
        }
      : undefined

    const activityAreaConnectData = data.activityArea
      ? {
          connect: {
            type_area: {
              area: data.activityArea.mainActivityArea,
              type: ActivityAreaType.AREA_OF_ACTIVITY,
            },
          },
        }
      : undefined

    const subActivityAreaConnectData = data.activityArea
      ? {
          connect: {
            type_area: {
              area: data.activityArea.subActivityArea,
              type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
            },
          },
        }
      : undefined

    const addressCreateData = {
      create: data.address,
    }

    const user = await prisma.user.create({
      data: {
        ...data.user,
        emailIsPublic: data.user.emailIsPublic ?? false,
        receiveReports: data.user.receiveReports ?? false,
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
    })
    return user
  }

  async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
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
    })

    return user
  }

  async listAllUsers() {
    const users = await prisma.user.findMany({
      include: userWithDetails.include,
    })

    return users
  }

  async listAllUsersDetailed(query?: ListAllUsersQuery) {
    if (!query) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          publicId: true,
          fullName: true,
          email: true,
          emailIsPublic: true,
          Address: {
            select: { state: true },
          },
          Institution: {
            select: { name: true },
          },
        },
      })

      const formattedUsers = users.map((userInfo) => ({
        id: userInfo.id,
        publicId: userInfo.publicId,
        fullName: userInfo.fullName,
        email: userInfo.email,
        emailIsPublic: userInfo.emailIsPublic,
        institutionName: userInfo.Institution.name,
        state: userInfo.Address.state,
      }))

      return {
        data: formattedUsers,
        meta: {
          totalItems: users.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: users.length,
        },
      }
    }

    const { searchQuery, countQuery } = buildListAllUsersDetailedQuery(query)

    const [countResult, users] = await Promise.all([
      prisma.$queryRaw<Array<{ total: number }>>(countQuery),
      prisma.$queryRaw<CustomUserWithSimplifiedDetailsRaw[]>(searchQuery),
    ])

    const totalItems = countResult[0].total

    const totalPages = Math.ceil(totalItems / query.limit)

    return {
      data: users.map(customUserSimplifiedAdapter),
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
          email: true,
          emailIsPublic: true,
          Address: {
            select: { state: true },
          },
          Institution: {
            select: { name: true },
          },
        },
      })

      const formattedUsers = users.map((userInfo) => ({
        id: userInfo.id,
        publicId: userInfo.publicId,
        fullName: userInfo.fullName,
        email: userInfo.email,
        emailIsPublic: userInfo.emailIsPublic,
        institutionName: userInfo.Institution.name,
        state: userInfo.Address.state,
      }))

      return {
        data: formattedUsers,
        meta: {
          totalItems: users.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: users.length,
        },
      }
    }

    const { searchQuery, countQuery } = buildListAllUsersSimplifiedQuery(query)

    const [countResult, users] = await Promise.all([
      prisma.$queryRaw<Array<{ total: number }>>(countQuery),
      prisma.$queryRaw<CustomUserWithSimplifiedDetailsRaw[]>(searchQuery),
    ])

    const totalItems = countResult[0].total

    const totalPages = Math.ceil(totalItems / query.limit)

    return {
      data: users.map(customUserSimplifiedAdapter),
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
    })
    return user
  }

  async setPasswordToken(id: number, tokenData: TokenData) {
    const user = await prisma.user.update({
      where: { id },
      data: { ...tokenData },
    })
    return user
  }
}
