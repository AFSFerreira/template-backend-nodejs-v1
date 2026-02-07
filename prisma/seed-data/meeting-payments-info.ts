import type { Prisma } from '@prisma/generated/client'

export const meetingPaymentInfoNestedMeetingData1: Prisma.MeetingPaymentInfoCreateNestedOneWithoutMeetingInput = {
  create: {
    pixKey: '123e4567-e89b-12d3-a456-426614174000',
    bank: '0000.0000.0000',
    code: '123456',
    agency: 'CAIXA ECONÔMICA FEDERAL',
    account: 'account',
    billingEmail: 'example@email.com',
    value: 120.34,
    limitDate: new Date(new Date('2025-11-14').getTime() + 1000 * 60 * 60 * 24),
  },
}
