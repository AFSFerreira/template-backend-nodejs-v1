import { userWithDetails } from '@custom-types/user-with-details'
import type { UserWithSimplifiedDetailsRaw } from '@custom-types/user-with-simplified-details-raw-type'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { ActivityAreaType } from '@prisma/client'
import { userSimplifiedAdapter } from '@repositories/prisma/adapters/users/user-simplified-adapter'
import { buildListAllUsersSimplifiedQuery } from '@repositories/prisma/queries/users/build-list-all-users-simplified-query'
import { evalTotalPages } from '@utils/eval-total-pages'
import type {
  ChangeUserPasswordQuery,
  CreateUserQuery,
  FindByIdentityDocumentQuery,
  FindConflictingUserQuery,
  ListAllUsersDetailedQuery,
  ListAllUsersSimplifiedQuery,
  SetPasswordTokenQuery,
  UpdateUserQuery,
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
            const { area, authors, ...filteredAcademicPublicationData } = academicPublication
            return {
              ...filteredAcademicPublicationData,
              AcademicPublicationAuthors: {
                create: authors.map((author) => ({
                  name: author,
                })),
              },
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
        emailIsPublic: data.user.emailIsPublic,
        receiveReports: data.user.receiveReports,
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

  async findBy(where: Prisma.UserWhereInput) {
    const user = await prisma.user.findFirst({
      where,
      include: userWithDetails.include,
    })
    return user
  }

  async findUniqueBy(where: Prisma.UserWhereUniqueInput) {
    const user = await prisma.user.findUnique({ where })
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

  async findByIdentityDocument(query: FindByIdentityDocumentQuery) {
    const user = await prisma.user.findUnique({
      where: { identityType_identityDocument: query },
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

  async findConflictingUser({ email, username, identity }: FindConflictingUserQuery) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, identity],
      },
    })

    return user
  }

  async listAllUsers() {
    const users = await prisma.user.findMany({
      include: userWithDetails.include,
      orderBy: [
        { fullName: 'asc' },
        { id: 'asc' },
      ]
    })

    return users
  }

  async listAllUsersDetailed(query?: ListAllUsersDetailedQuery) {
    if (!query) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          publicId: true,
          fullName: true,
          email: true,
          emailIsPublic: true,
          Address: { select: { state: true } },
          Institution: { select: { name: true } },
        },
        orderBy: [
          { fullName: 'asc' },
          { id: 'asc' }
        ]
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
      prisma.$queryRaw<UserWithSimplifiedDetailsRaw[]>(searchQuery),
    ])

    const pageSize = query.limit
    const totalItems = countResult[0].total

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: users.map(userSimplifiedAdapter),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async listAllUsersSimplified(query?: ListAllUsersSimplifiedQuery) {
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
        orderBy: [
          { fullName: 'asc' },
          { id: 'asc' },
        ]
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
      prisma.$queryRaw<UserWithSimplifiedDetailsRaw[]>(searchQuery),
    ])

    const pageSize = query.limit
    const totalItems = countResult[0].total

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: users.map(userSimplifiedAdapter),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
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

  async update({ id, data }: UpdateUserQuery) {
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

  async changePassword({ id, passwordHash }: ChangeUserPasswordQuery) {
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

  async setPasswordToken({ id, tokenData }: SetPasswordTokenQuery) {
    const user = await prisma.user.update({
      where: { id },
      data: tokenData,
    })
    return user
  }
}
