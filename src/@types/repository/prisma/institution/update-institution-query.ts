import type { Prisma } from '@prisma/client'

export interface UpdateInstitutionQuery {
  id: number
  data: Prisma.InstitutionUpdateInput
}
