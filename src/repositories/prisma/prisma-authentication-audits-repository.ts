import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { AuthenticationAuditsRepository } from '../authentication-audits-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaAuthenticationAuditsRepository implements AuthenticationAuditsRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  async create(data: Prisma.AuthenticationAuditUncheckedCreateInput) {
    const authenticationAudit = await this.dbContext.client.authenticationAudit.create({
      data,
    })
    return authenticationAudit
  }
}
