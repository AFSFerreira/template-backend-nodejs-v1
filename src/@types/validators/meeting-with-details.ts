import type { Prisma } from '@prisma/generated/client'

export const meetingWithDetails = {
  include: {
    MeetingPaymentInfo: true,
    MeetingDate: true,
  },
} satisfies Prisma.MeetingDefaultArgs

export type MeetingWithDetails = Prisma.MeetingGetPayload<typeof meetingWithDetails>
