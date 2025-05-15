import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { UserActionAuditsRepository } from '../user-action-audits-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class PrismaUserActionAuditsRepository implements UserActionAuditsRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: Prisma.UserActionAuditUncheckedCreateInput) {
    const userActionAudit = await this.dbContext.client.userActionAudit.create({
      data,
    })
    return userActionAudit
  }
}
