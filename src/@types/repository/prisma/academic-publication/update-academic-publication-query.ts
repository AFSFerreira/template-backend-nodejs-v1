import type { Prisma } from '@prisma/generated/client'

export interface UpdateAcademicPublicationQuery {
  id: number
  data: Prisma.AcademicPublicationUpdateInput
}
