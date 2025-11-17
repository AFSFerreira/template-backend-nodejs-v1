import type { UserWithSimplifiedDetailsRaw } from '@custom-types/adapter/input/user-with-simplified-details-raw-type'
import type { ChangeUserPasswordQuery } from '@custom-types/repositories/user/change-user-password-query'
import type { CreateUserQuery } from '@custom-types/repositories/user/create-user-query'
import type { FindByIdentityDocumentQuery } from '@custom-types/repositories/user/find-by-identity-document-query'
import type { FindConflictingUserQuery } from '@custom-types/repositories/user/find-conflicting-user-query'
import type { ListAllUsersDetailedQuery } from '@custom-types/repositories/user/list-all-users-detailed-query'
import type { ListAllUsersSimplifiedQuery } from '@custom-types/repositories/user/list-all-users-simplified-query'
import type { SetPasswordTokenQuery } from '@custom-types/repositories/user/set-password-token-query'
import type { UpdateUserQuery } from '@custom-types/repositories/user/update-user-query'
import { userWithDetails } from '@custom-types/validator/user-with-details'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { ActivityAreaType } from '@prisma/client'
import { userSimplifiedAdapter } from '@repositories/prisma/adapters/users/user-simplified-adapter'
import { buildListAllUsersSimplifiedQuery } from '@repositories/prisma/queries/users/build-list-all-users-simplified-query'
import { evalTotalPages } from '@utils/eval-total-pages'
import type { UsersRepository } from '../users-repository'
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
            startGraduationDate: new Date(data.enrolledCourse.startGraduationDate),
            expectedGraduationDate: new Date(data.enrolledCourse.expectedGraduationDate),
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
        birthdate: new Date(data.user.birthdate),
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

  async findByEmails(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { secondaryEmail: email }],
      },
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
        OR: [...(email ? [{ email }] : []), ...(username ? [{ username }] : []), ...(identity ? [identity] : [])],
      },
    })

    return user
  }

  async listAllUsers() {
    const users = await prisma.user.findMany({
      include: userWithDetails.include,
      orderBy: [{ fullName: 'asc' }, { id: 'asc' }],
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
        orderBy: [{ fullName: 'asc' }, { id: 'asc' }],
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
        orderBy: [{ fullName: 'asc' }, { id: 'asc' }],
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
        loginAttempts: { increment: 1 },
      },
    })
  }

  async delete(id: number) {
    await prisma.user.delete({
      where: { id },
    })
  }

  async update({ id, data }: UpdateUserQuery) {
    const keywordsConnectOrCreateData: Prisma.UserUpdateInput['Keyword'] = data.keyword
      ? {
          set: [],
          connectOrCreate: data.keyword.map((value: string) => ({
            where: { value },
            create: { value },
          })),
        }
      : undefined

    const academicPublicationCreateData: Prisma.UserUpdateInput['AcademicPublication'] = data.academicPublication
      ? {
          deleteMany: {},

          // 2. Cria as novas baseadas na lista enviada
          create: data.academicPublication.map((academicPublication) => {
            const { area, authors, ...filteredAcademicPublicationData } = academicPublication

            return {
              ...filteredAcademicPublicationData,

              // Recria os autores
              AcademicPublicationAuthors: {
                create: authors.map((author) => ({
                  name: author,
                })),
              },

              // Reconecta a área de atividade
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

    const enrolledCourseUpsertData: Prisma.UserUpdateInput['EnrolledCourse'] = data.enrolledCourse
      ? {
          upsert: {
            create: {
              ...data.enrolledCourse,
              scholarshipHolder: data.enrolledCourse.scholarshipHolder ?? false,
            },
            update: {
              ...data.enrolledCourse,
              scholarshipHolder: data.enrolledCourse.scholarshipHolder ?? false,
            },
          },
        }
      : undefined

    const institutionConnectData: Prisma.UserUpdateInput['Institution'] = data.institution
      ? {
          connect: { name: data.institution.name },
        }
      : undefined

    const activityAreaConnectData: Prisma.UserUpdateInput['ActivityArea'] = data.activityArea
      ? {
          connect: {
            type_area: {
              area: data.activityArea.mainActivityArea,
              type: ActivityAreaType.AREA_OF_ACTIVITY,
            },
          },
        }
      : undefined

    const subActivityAreaConnectData: Prisma.UserUpdateInput['SubActivityArea'] = data.activityArea
      ? {
          connect: {
            type_area: {
              area: data.activityArea.subActivityArea,
              type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
            },
          },
        }
      : undefined

    const addressUpsertData: Prisma.UserUpdateInput['Address'] = data.address
      ? {
          upsert: {
            create: data.address,
            update: data.address,
          },
        }
      : undefined

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data.user,
        emailIsPublic: data.user.emailIsPublic ?? false,
        receiveReports: data.user.receiveReports ?? false,
        Address: addressUpsertData,
        EnrolledCourse: enrolledCourseUpsertData,
        Institution: institutionConnectData,
        AcademicPublication: academicPublicationCreateData,
        Keyword: keywordsConnectOrCreateData,
        ActivityArea: activityAreaConnectData,
        SubActivityArea: subActivityAreaConnectData,
      },
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
