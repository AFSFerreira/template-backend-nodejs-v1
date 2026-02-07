import type { Prisma } from '@prisma/generated/client'

export const meetingPaymentInfoNestedMeetingData1: Prisma.MeetingPaymentInfoCreateNestedOneWithoutMeetingInput = {
  create: {
    pixKey: '00 00000-0000',
    bank: '0000.0000.0000',
    code: '123456',
    agency: 'CAIXA ECONÔMICA FEDERAL',
    account: 'account',
    value: 120.34,
    limitDate: new Date(new Date('2025-11-14').getTime() + 1000 * 60 * 60 * 24),
  },
}
