import { Prisma } from '@prisma/client'

export const meetingWithDetails = Prisma.validator<Prisma.MeetingDefaultArgs>()({
  include: {
    MeetingPaymentInfo: {
      include: {
        PaymentInfo: true,
      },
    },
    MeetingDate: true,
  },
})

export type MeetingWithDetails = Prisma.MeetingGetPayload<typeof meetingWithDetails>
