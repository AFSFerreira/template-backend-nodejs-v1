import type { Prisma } from '@prisma/client'

export const meetingPaymentInfoNestedMeetingData1: Prisma.MeetingPaymentInfoCreateNestedOneWithoutMeetingInput = {
  create: {
    value: 120.34,
    limitDate: new Date(new Date('2025-11-14').getTime() + 1000 * 60 * 60 * 24),
    PaymentInfo: {
      connect: { id: 1 },
    },
  },
}
