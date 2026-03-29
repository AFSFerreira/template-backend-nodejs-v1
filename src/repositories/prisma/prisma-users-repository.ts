import type { ChangeUserPasswordQuery } from '@custom-types/repository/prisma/user/change-user-password-query'
import type { CreateUserQuery } from '@custom-types/repository/prisma/user/create-user-query'
import type { FindConflictingUserQuery } from '@custom-types/repository/prisma/user/find-conflicting-user-query'
import type { ListAllUsersQuery } from '@custom-types/repository/prisma/user/list-all-users-query'
import type { SetPasswordTokenQuery } from '@custom-types/repository/prisma/user/set-password-token-query'
import type { UpdateRoleQuery } from '@custom-types/repository/prisma/user/update-role-query'
import type { UpdateUserQuery } from '@custom-types/repository/prisma/user/update-user-query'
import type { HashedToken } from '@custom-types/services/hashes/hashed-token'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { UsersRepository } from '../users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, singleton } from 'tsyringe'

@singleton()
export class PrismaUsersRepository implements UsersRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: CreateUserQuery) {
    const user = await this.dbContext.client.user.create({
      data,
    })
    return user
  }

  async findBy(where: Prisma.UserWhereInput) {
    const user = await this.dbContext.client.user.findFirst({
      where,
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

  async findByUsername(username: string) {
    const user = await this.dbContext.client.user.findUnique({
      where: { username },
    })
    return user
  }

  async findById(id: string) {
    const user = await this.dbContext.client.user.findUnique({
      where: { id },
    })
    return user
  }

  async setLastLogin(id: string) {
    await this.dbContext.client.user.update({
      where: { id },
      data: {
        lastLogin: new Date(),
      },
    })
  }

  async findConflictingUser({ email, username }: FindConflictingUserQuery) {
    const user = await this.dbContext.client.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    return user
  }

  async listAllUsers(query: ListAllUsersQuery) {
    const { limit: pageSize, page: currentPage, ...filteredInfo } = query

    const { skip, take } = evalOffset({ currentPage, pageSize })

    const orderBy: Prisma.UserOrderByWithRelationInput = {
      ...(query.orderBy?.fullNameOrder ? { fullName: query.orderBy.fullNameOrder } : {}),
    }

    const [totalItems, users] = await Promise.all([
      this.dbContext.client.user.count(),
      this.dbContext.client.user.findMany({
        where: filteredInfo,
        take,
        skip,
        orderBy,
      }),
    ])

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: users,
      meta: {
        totalItems,
        totalPages,
        currentPage,
        pageSize,
      },
    }
  }

  async incrementLoginAttempts(id: string) {
    await this.dbContext.client.user.update({
      where: { id },
      data: {
        loginAttempts: { increment: 1 },
      },
    })
  }

  async resetLoginAttempts(id: string) {
    await this.dbContext.client.user.update({
      where: { id },
      data: {
        loginAttempts: 0,
      },
    })
  }

  async delete(id: string) {
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
    const user = await this.dbContext.client.user.update({
      where: { id },
      data,
    })

    return user
  }

  async validateUserToken(recoveryPasswordTokenHash: HashedToken) {
    const user = await this.dbContext.client.user.findFirst({
      where: { recoveryPasswordTokenHash },
    })
    return user
  }

  async validateEmailVerificationToken(emailVerificationTokenHash: HashedToken) {
    const user = await this.dbContext.client.user.findFirst({
      where: { emailVerificationTokenHash },
    })
    return user
  }

  async confirmEmailVerification(id: string) {
    const user = await this.dbContext.client.user.update({
      where: { id },
      data: {
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

  async upgradePasswordHash({ id, passwordHash }: ChangeUserPasswordQuery) {
    await this.dbContext.client.user.update({
      where: { id },
      data: { passwordHash },
    })
  }

  async setPasswordToken({ id, tokenData }: SetPasswordTokenQuery) {
    const user = await this.dbContext.client.user.update({
      where: { id },
      data: tokenData,
    })
    return user
  }

  async totalCount(where?: Prisma.UserWhereInput) {
    const totalUsers = await this.dbContext.client.user.count({ where })
    return totalUsers
  }
}
