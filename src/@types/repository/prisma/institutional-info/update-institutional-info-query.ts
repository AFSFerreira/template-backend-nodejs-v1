import type { Prisma } from '@prisma/generated/client'

export interface UpdateInstitutionalInfoQuery {
  id: number
  data: Prisma.InstitutionalInfoUpdateInput
}
