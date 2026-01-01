import { Prisma } from '@prisma/client'

export const academicPublicationWithDetails = Prisma.validator<Prisma.AcademicPublicationDefaultArgs>()({
  include: {
    User: true,
    ActivityArea: true,
    AcademicPublicationAuthors: true,
  },
})

export type AcademicPublicationWithDetails = Prisma.AcademicPublicationGetPayload<typeof academicPublicationWithDetails>
