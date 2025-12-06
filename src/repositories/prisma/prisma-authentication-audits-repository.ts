import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { injectable } from 'tsyringe'
import type { AuthenticationAuditsRepository } from '../authentication-audits-repository'

@injectable()
export class PrismaAuthenticationAuditsRepository implements AuthenticationAuditsRepository {
  async create(data: Prisma.AuthenticationAuditUncheckedCreateInput) {
    const authenticationAudit = await prisma.authenticationAudit.create({
      data,
    })
    return authenticationAudit
  }
}
