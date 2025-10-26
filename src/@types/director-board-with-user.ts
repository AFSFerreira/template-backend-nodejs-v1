import { Prisma } from '@prisma/client'

export const directorBoardWithUser = Prisma.validator<Prisma.DirectorBoardDefaultArgs>()({
  include: {
    User: true,
    DirectorPosition: true,
  },
})

export type DirectorBoardWithUser = Prisma.DirectorBoardGetPayload<typeof directorBoardWithUser>
