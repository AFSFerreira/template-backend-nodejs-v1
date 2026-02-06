import type { Prisma } from '@prisma/client'

export const userWithDetails = {
  include: {
    EnrolledCourse: true,
    ActivityArea: true,
    SubActivityArea: true,
    Keyword: true,
    Institution: true,
    Address: {
      include: {
        State: {
          include: {
            Country: true,
          },
        },
      },
    },
    AcademicPublication: {
      include: {
        AcademicPublicationAuthors: true,
        ActivityArea: true,
      },
    },
    DirectorBoard: {
      include: {
        DirectorPosition: true,
      },
    },
  },
} satisfies Prisma.UserDefaultArgs

export type UserWithDetails = Prisma.UserGetPayload<typeof userWithDetails>
