import type { Prisma } from '@prisma/client'

export const meetingEnrollmentWithDetails = {
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
} satisfies Prisma.MeetingEnrollmentDefaultArgs

export type MeetingEnrollmentWithDetails = Prisma.MeetingEnrollmentGetPayload<typeof meetingEnrollmentWithDetails>
