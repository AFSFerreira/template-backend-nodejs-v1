import type { Prisma } from '@prisma/generated/client'

export type CreateDirectorBoardQuery = Omit<Prisma.DirectorBoardCreateInput, 'User' | 'DirectorPosition'> & {
  userId: number
  directorPositionId: number
}
