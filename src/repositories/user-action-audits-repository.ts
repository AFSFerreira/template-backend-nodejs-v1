import type { Prisma, UserActionAudit } from '@prisma/generated/client'

export interface UserActionAuditsRepository {
  create: (data: Prisma.UserActionAuditUncheckedCreateInput) => Promise<UserActionAudit>
}
