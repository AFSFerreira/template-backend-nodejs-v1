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
import { userWithDetails } from '@custom-types/validators/user-with-details'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import type { Prisma } from '@prisma/generated/client'
import { MembershipStatusType } from '@prisma/generated/enums'
import { userSimplifiedAdapter } from '@repositories/prisma/adapters/users/user-simplified-adapter'
import { buildListAllUsersSimplifiedQuery } from '@repositories/prisma/queries/users/build-list-all-users-simplified-query'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'
import type { UsersRepository } from '../users-repository'
import { toPrismaCreateUser } from './mappers/users/create-user'
import { toPrismaUpdateUser } from './mappers/users/update-user'
import { buildListAllUsersDetailedQuery } from './queries/users/build-list-all-users-detailed-query'

@injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: CreateUserQuery) {
    const formattedData = toPrismaCreateUser(data)

    const user = await this.dbContext.client.user.create({
      data: formattedData,
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

  async listAllUsersDetailed(query: ListAllUsersDetailedQuery) {
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

  async listAllUsersSimplified(query: ListAllUsersSimplifiedQuery) {
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
    const formattedData = toPrismaUpdateUser(data)

    const user = await this.dbContext.client.user.update({
      where: { id },
      data: formattedData,
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
