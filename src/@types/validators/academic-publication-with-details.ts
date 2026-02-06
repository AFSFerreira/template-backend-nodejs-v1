import type { Prisma } from '@prisma/client'

export const academicPublicationWithDetails = {
  include: {
    User: true,
    ActivityArea: true,
    AcademicPublicationAuthors: true,
  },
} satisfies Prisma.AcademicPublicationDefaultArgs

export type AcademicPublicationWithDetails = Prisma.AcademicPublicationGetPayload<typeof academicPublicationWithDetails>
