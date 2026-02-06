import type { Prisma } from '@prisma/generated/client'

export const directorBoardWithUser = {
  include: {
    User: true,
    DirectorPosition: true,
  },
} satisfies Prisma.DirectorBoardDefaultArgs

export type DirectorBoardWithUser = Prisma.DirectorBoardGetPayload<typeof directorBoardWithUser>
