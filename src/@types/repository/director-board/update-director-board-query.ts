import type { Prisma } from '@prisma/client'

export interface UpdateDirectorBoardQuery {
  id: number
  data: Prisma.DirectorBoardUpdateInput
}
