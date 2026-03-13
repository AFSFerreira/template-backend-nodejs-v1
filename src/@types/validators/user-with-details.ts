import type { Prisma } from '@prisma/generated/client'

export const userWithDetails = {
  include: {
    ResearcherProfile: {
      include: {
        EnrolledCourse: true,
        ActivityArea: true,
        SubActivityArea: true,
        Keyword: true,
        Institution: true,
        AcademicPublication: {
          include: {
            AcademicPublicationAuthors: true,
            ActivityArea: true,
          },
        },
      },
    },
    Address: {
      include: {
        State: {
          include: {
            Country: true,
          },
        },
      },
    },
    DirectorBoard: {
      include: {
        DirectorPosition: true,
      },
    },
  },
} as const satisfies Prisma.UserDefaultArgs

export type UserWithDetails = Prisma.UserGetPayload<typeof userWithDetails>
