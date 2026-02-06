import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import type { Prisma } from '@prisma/generated/client'
import { inject, injectable } from 'tsyringe'
import type { AuthenticationAuditsRepository } from '../authentication-audits-repository'

@injectable()
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
