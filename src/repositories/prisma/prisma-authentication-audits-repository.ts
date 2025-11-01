import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import type { AuthenticationAuditsRepository } from '../authentication-audits-repository'

export class PrismaAuthenticationAuditsRepository implements AuthenticationAuditsRepository {
  async create(data: Prisma.AuthenticationAuditUncheckedCreateInput) {
    const authenticationAudit = await prisma.authenticationAudit.create({
      data,
    })
    return authenticationAudit
  }
}
