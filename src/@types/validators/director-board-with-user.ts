import type { Prisma } from '@prisma/generated/client'

export const directorBoardWithUser = {
  include: {
    User: true,
    DirectorPosition: true,
  },
} as const satisfies Prisma.DirectorBoardDefaultArgs

export type DirectorBoardWithUser = Prisma.DirectorBoardGetPayload<typeof directorBoardWithUser>
