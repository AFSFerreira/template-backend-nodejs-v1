import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { AuthenticationAuditsRepository } from '../authentication-audits-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class PrismaAuthenticationAuditsRepository implements AuthenticationAuditsRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  async create(data: Prisma.AuthenticationAuditUncheckedCreateInput) {
    const authenticationAudit = await this.dbContext.client.authenticationAudit.create({
      data,
    })
    return authenticationAudit
  }
}
