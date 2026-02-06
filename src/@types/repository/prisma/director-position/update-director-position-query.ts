import type { Prisma } from '@prisma/generated/client'

export interface UpdateDirectorPositionQuery {
  id: number
  data: Prisma.DirectorPositionUpdateInput
}
