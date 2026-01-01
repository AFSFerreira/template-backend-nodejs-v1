import { Prisma } from '@prisma/client'

export const meetingEnrollmentWithDetails = Prisma.validator<Prisma.MeetingEnrollmentDefaultArgs>()({
  include: {
    UserDetails: {
      include: {
        User: {
          include: {
            Institution: true,
          },
        },
      },
    },
    GuestDetails: true,
    MeetingPresentation: {
      include: {
        Authors: true,
        Affiliations: true,
      },
    },
  },
})

export type MeetingEnrollmentWithDetails = Prisma.MeetingEnrollmentGetPayload<typeof meetingEnrollmentWithDetails>
