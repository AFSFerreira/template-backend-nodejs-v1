import type { Prisma } from '@prisma/client'

export type CreateDirectorBoardQuery = Omit<Prisma.DirectorBoardCreateInput, 'User' | 'DirectorPosition'> & {
  userId: number
  directorPositionId: number
}
