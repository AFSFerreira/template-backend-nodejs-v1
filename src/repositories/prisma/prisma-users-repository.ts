import type { UserWithSimplifiedDetailsRaw } from '@custom-types/repository/prisma/adapter/user-simplified'
import type { ChangeUserPasswordQuery } from '@custom-types/repository/prisma/user/change-user-password-query'
import type { ConfirmEmailChangeQuery } from '@custom-types/repository/prisma/user/confirm-email-change-query'
import type { CreateUserQuery } from '@custom-types/repository/prisma/user/create-user-query'
import type { FindByIdentityDocumentQuery } from '@custom-types/repository/prisma/user/find-by-identity-document-query'
import type { FindConflictingUserQuery } from '@custom-types/repository/prisma/user/find-conflicting-user-query'
import type { ListAllUsersDetailedQuery } from '@custom-types/repository/prisma/user/list-all-users-detailed-query'
import type { ListAllUsersSimplifiedQuery } from '@custom-types/repository/prisma/user/list-all-users-simplified-query'
import type { SetEmailChangeTokenQuery } from '@custom-types/repository/prisma/user/set-email-change-token-query'
import type { SetPasswordTokenQuery } from '@custom-types/repository/prisma/user/set-password-token-query'
import type { UpdateRoleQuery } from '@custom-types/repository/prisma/user/update-role-query'
import type { UpdateUserQuery } from '@custom-types/repository/prisma/user/update-user-query'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { UsersRepository } from '../users-repository'
import { userWithDetails } from '@custom-types/validators/user-with-details'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ActivityAreaType, MembershipStatusType } from '@prisma/client'
import { userSimplifiedAdapter } from '@repositories/prisma/adapters/users/user-simplified-adapter'
import { buildListAllUsersSimplifiedQuery } from '@repositories/prisma/queries/users/build-list-all-users-simplified-query'
import { isRegisterUserHighLevelEducation } from '@services/guards/is-register-user-high-level-education'
import { isRegisterUserHighLevelStudentEducation } from '@services/guards/is-register-user-high-level-student-education'
import { isUpdateUserHighLevelEducation } from '@services/guards/is-update-user-high-level-education'
import { isUpdateUserHighLevelStudentEducation } from '@services/guards/is-update-user-high-level-student-education'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'
import { buildListAllUsersDetailedQuery } from './queries/users/build-list-all-users-detailed-query'

@injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: CreateUserQuery) {
    let keywordsConnectOrCreateData: Prisma.UserCreateInput['Keyword'] | undefined

    let academicPublicationCreateData: Prisma.UserCreateInput['AcademicPublication'] | undefined

    let enrolledCourseCreateData: Prisma.UserCreateInput['EnrolledCourse'] | undefined

    let institutionConnectOrCreateData: Prisma.UserCreateInput['Institution'] | undefined

    let activityAreaConnectData: Prisma.UserCreateInput['ActivityArea'] | undefined

    let subActivityAreaConnectData: Prisma.UserCreateInput['SubActivityArea'] | undefined

    const isUserHighLevelEducation = isRegisterUserHighLevelEducation(data)
    const isUserHighLevelStudentEducation = isRegisterUserHighLevelStudentEducation(data)

    if (isUserHighLevelEducation || isUserHighLevelStudentEducation) {
      if (isUserHighLevelStudentEducation) {
        enrolledCourseCreateData = {
          create: {
            ...data.enrolledCourse,
            startGraduationDate: new Date(data.enrolledCourse.startGraduationDate),
            expectedGraduationDate: new Date(data.enrolledCourse.expectedGraduationDate),
            scholarshipHolder: data.enrolledCourse.scholarshipHolder ?? false,
          },
        }
      }

      keywordsConnectOrCreateData = {
        connectOrCreate: data.keyword.map((value: string) => ({
          where: { value },
          create: { value },
        })),
      }

      academicPublicationCreateData = {
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

      institutionConnectOrCreateData = {
        connectOrCreate: {
          create: { name: data.institution.name },
          where: { name: data.institution.name },
        },
      }

      activityAreaConnectData = {
        connect: {
          type_area: {
            area: data.activityArea.mainActivityArea,
            type: ActivityAreaType.AREA_OF_ACTIVITY,
          },
        },
      }

      subActivityAreaConnectData = {
        connect: {
          type_area: {
            area: data.activityArea.subActivityArea,
            type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
          },
        },
      }
    }

    const { stateId, ...filteredAddressInfo } = data.address
    const addressCreateData: Prisma.UserCreateInput['Address'] = {
      create: {
        ...filteredAddressInfo,
        State: {
          connect: {
            id: stateId,
          },
        },
      },
    }

    const user = await this.dbContext.client.user.create({
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
    const user = await this.dbContext.client.user.findFirst({
      where,
      include: userWithDetails.include,
    })
    return user
  }

  async findUniqueBy(where: Prisma.UserWhereUniqueInput) {
    const user = await this.dbContext.client.user.findUnique({ where })
    return user
  }

  async findByEmail(email: string) {
    const user = await this.dbContext.client.user.findUnique({
      where: { email },
    })
    return user
  }

  async findByEmails(email: string) {
    const user = await this.dbContext.client.user.findFirst({
      where: {
        OR: [{ email }, { secondaryEmail: email }],
      },
    })
    return user
  }

  async findByUsername(username: string) {
    const user = await this.dbContext.client.user.findUnique({
      where: { username },
    })
    return user
  }

  async findById(id: number) {
    const user = await this.dbContext.client.user.findUnique({
      where: { id },
      include: userWithDetails.include,
    })
    return user
  }

  async findByPublicId(publicId: string) {
    const user = await this.dbContext.client.user.findUnique({
      where: { publicId },
      include: userWithDetails.include,
    })
    return user
  }

  async findByIdentityDocument(query: FindByIdentityDocumentQuery) {
    const user = await this.dbContext.client.user.findUnique({
      where: { identityType_identityDocument: query },
    })
    return user
  }

  async setLastLogin(id: number) {
    await this.dbContext.client.user.update({
      where: { id },
      data: {
        lastLogin: new Date(),
      },
    })
  }

  async findConflictingUser({ email, secondaryEmail, username, identity }: FindConflictingUserQuery) {
    const user = await this.dbContext.client.user.findFirst({
      where: {
        OR: [
          { email },
          { email: secondaryEmail },
          { secondaryEmail },
          { secondaryEmail: email },
          { username },
          ...(identity ? [identity] : []),
        ],
      },
    })

    return user
  }

  async *streamAllUsers(batchSize = 500) {
    let cursor: number | undefined

    while (true) {
      const batch: UserWithDetails[] = await this.dbContext.client.user.findMany({
        take: batchSize,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        include: userWithDetails.include,
        orderBy: { id: 'asc' },
      })

      if (batch.length === 0) break

      for (const user of batch) yield user

      cursor = batch.at(-1)?.id
    }
  }

  async listAllUsersDetailed(query?: ListAllUsersDetailedQuery) {
    if (!query) {
      const users = await this.dbContext.client.user.findMany({
        select: {
          id: true,
          publicId: true,
          profileImage: true,
          fullName: true,
          role: true,
          email: true,
          emailIsPublic: true,
          Address: { select: { State: { select: { name: true } } } },
          Institution: { select: { name: true } },
        },
        orderBy: [{ fullName: 'asc' }, { id: 'asc' }],
      })

      const formattedUsers = users.map((userInfo) => ({
        id: userInfo.id,
        publicId: userInfo.publicId,
        fullName: userInfo.fullName,
        profileImage: userInfo.profileImage,
        role: userInfo.role,
        email: userInfo.email,
        emailIsPublic: userInfo.emailIsPublic,
        institutionName: userInfo.Institution?.name,
        state: userInfo.Address?.State.name,
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
      this.dbContext.client.$queryRaw<Array<{ total: number }>>(countQuery),
      this.dbContext.client.$queryRaw<UserWithSimplifiedDetailsRaw[]>(searchQuery),
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
      const users = await this.dbContext.client.user.findMany({
        select: {
          id: true,
          publicId: true,
          fullName: true,
          role: true,
          email: true,
          profileImage: true,
          emailIsPublic: true,
          Address: {
            select: { State: { select: { name: true } } },
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
        role: userInfo.role,
        profileImage: userInfo.profileImage,
        email: userInfo.email,
        emailIsPublic: userInfo.emailIsPublic,
        institutionName: userInfo.Institution?.name,
        state: userInfo.Address?.State.name,
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
      this.dbContext.client.$queryRaw<Array<{ total: number }>>(countQuery),
      this.dbContext.client.$queryRaw<UserWithSimplifiedDetailsRaw[]>(searchQuery),
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
    await this.dbContext.client.user.update({
      where: { id },
      data: {
        loginAttempts: { increment: 1 },
      },
    })
  }

  async delete(id: number) {
    await this.dbContext.client.user.delete({
      where: { id },
    })
  }

  async updateRole({ id, role }: UpdateRoleQuery) {
    await this.dbContext.client.user.update({
      where: { id },
      data: { role },
    })
  }

  async update({ id, data }: UpdateUserQuery) {
    let keywordsConnectOrCreateData: Prisma.UserUpdateInput['Keyword'] | undefined

    let academicPublicationCreateData: Prisma.UserUpdateInput['AcademicPublication'] | undefined

    let enrolledCourseUpsertData: Prisma.UserUpdateInput['EnrolledCourse'] | undefined

    let institutionConnectData: Prisma.UserUpdateInput['Institution'] | undefined

    let activityAreaConnectData: Prisma.UserUpdateInput['ActivityArea'] | undefined

    let subActivityAreaConnectData: Prisma.UserUpdateInput['SubActivityArea'] | undefined

    const isUserHighLevelEducation = isUpdateUserHighLevelEducation(data)
    const isUserHighLevelStudentEducation = isUpdateUserHighLevelStudentEducation(data)

    if (isUserHighLevelEducation || isUserHighLevelStudentEducation) {
      if (isUserHighLevelStudentEducation) {
        enrolledCourseUpsertData = data.enrolledCourse
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
      }

      keywordsConnectOrCreateData = data.keyword
        ? {
            set: [],
            connectOrCreate: data.keyword.map((value: string) => ({
              where: { value },
              create: { value },
            })),
          }
        : undefined

      academicPublicationCreateData = data.academicPublication
        ? {
            deleteMany: {},
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

      institutionConnectData = data.institution
        ? {
            connect: { name: data.institution.name },
          }
        : undefined

      activityAreaConnectData = data.activityArea
        ? {
            connect: {
              type_area: {
                area: data.activityArea.mainActivityArea,
                type: ActivityAreaType.AREA_OF_ACTIVITY,
              },
            },
          }
        : undefined

      subActivityAreaConnectData = data.activityArea
        ? {
            connect: {
              type_area: {
                area: data.activityArea.subActivityArea,
                type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
              },
            },
          }
        : undefined
    }

    const addressUpsertData: Prisma.UserUpdateInput['Address'] = data.address
      ? {
          upsert: {
            create: data.address,
            update: data.address,
          },
        }
      : undefined

    const user = await this.dbContext.client.user.update({
      where: { id },
      data: {
        ...data.user,
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
    const user = await this.dbContext.client.user.findFirst({
      where: { recoveryPasswordTokenHash },
    })
    return user
  }

  async validateEmailVerificationToken(emailVerificationTokenHash: string) {
    const user = await this.dbContext.client.user.findFirst({
      where: { emailVerificationTokenHash },
    })
    return user
  }

  async confirmEmailVerification(id: number) {
    const user = await this.dbContext.client.user.update({
      where: { id },
      data: {
        membershipStatus: MembershipStatusType.PENDING,
        emailVerifiedAt: new Date(),
        emailVerificationTokenHash: null,
        emailVerificationTokenExpiresAt: null,
      },
    })
    return user
  }

  async changePassword({ id, passwordHash }: ChangeUserPasswordQuery) {
    const user = await this.dbContext.client.user.update({
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
    const user = await this.dbContext.client.user.update({
      where: { id },
      data: tokenData,
    })
    return user
  }

  async setEmailChangeToken({
    id,
    newEmail,
    emailVerificationTokenHash,
    emailVerificationTokenExpiresAt,
  }: SetEmailChangeTokenQuery) {
    const user = await this.dbContext.client.user.update({
      where: { id },
      data: {
        newEmail,
        emailVerificationTokenHash,
        emailVerificationTokenExpiresAt,
      },
    })
    return user
  }

  async confirmEmailChange({ id, newEmail }: ConfirmEmailChangeQuery) {
    const user = await this.dbContext.client.user.update({
      where: { id },
      data: {
        email: newEmail,
        newEmail: null,
        emailVerificationTokenHash: null,
        emailVerificationTokenExpiresAt: null,
      },
    })
    return user
  }

  async totalCount(where?: Prisma.UserWhereInput) {
    const totalUsers = await this.dbContext.client.user.count({ where })
    return totalUsers
  }
}
