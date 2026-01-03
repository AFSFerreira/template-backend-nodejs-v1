import type { Prisma } from '@prisma/client'

export interface UpdateInstitutionalInfoQuery {
  id: number
  data: Prisma.InstitutionalInfoUpdateInput
}
