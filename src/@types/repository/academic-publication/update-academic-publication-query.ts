import type { Prisma } from '@prisma/client'

export interface UpdateAcademicPublicationQuery {
  id: number
  data: Prisma.AcademicPublicationUpdateInput
}
