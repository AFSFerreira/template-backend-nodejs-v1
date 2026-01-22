import type { PaymentInfo } from '@prisma/client'

export interface PaymentInfoPresenterInput extends PaymentInfo {}

export interface HTTPPaymentInfo {
  pixKey: string
  bank: string
  code: string
  agency: string
  account: string
}
