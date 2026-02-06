import type { Prisma } from '@prisma/generated/client'

export interface UpdateDirectorBoardQuery {
  id: number
  data: Prisma.DirectorBoardUpdateInput
}
