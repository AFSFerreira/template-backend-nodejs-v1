import type { Prisma } from '@prisma/generated/client'

export interface UpdateInstitutionQuery {
  id: number
  data: Prisma.InstitutionUpdateInput
}
