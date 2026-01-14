import type { Prisma } from '@prisma/client'

export interface UpdateDirectorPositionQuery {
  id: number
  data: Prisma.DirectorPositionUpdateInput
}
