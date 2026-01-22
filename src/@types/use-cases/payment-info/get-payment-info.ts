import type { PaymentInfo } from '@prisma/client'

export interface GetPaymentInfoUseCaseResponse {
  paymentInfo: PaymentInfo
}
