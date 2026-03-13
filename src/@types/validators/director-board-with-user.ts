import type { Prisma } from '@prisma/generated/client'

export const directorBoardWithUser = {
  include: {
    User: {
      include: {
        ResearcherProfile: true,
      },
    },
    DirectorPosition: true,
  },
} as const satisfies Prisma.DirectorBoardDefaultArgs

export type DirectorBoardWithUser = Prisma.DirectorBoardGetPayload<typeof directorBoardWithUser>
