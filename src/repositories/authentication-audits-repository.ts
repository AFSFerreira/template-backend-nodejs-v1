import type { AuthenticationAudit, Prisma } from '@prisma/generated/client'

export interface AuthenticationAuditsRepository {
  create: (data: Prisma.AuthenticationAuditUncheckedCreateInput) => Promise<AuthenticationAudit>
}
