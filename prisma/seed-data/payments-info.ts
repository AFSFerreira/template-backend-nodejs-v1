import type { Prisma } from '@prisma/client'

export const paymentInfo1: Prisma.PaymentInfoCreateInput = {
  pixKey: '00 00000-0000',
  bank: '0000.0000.0000',
  code: '123456',
  agency: 'CAIXA ECONÔMICA FEDERAL',
  account: 'account',
}
