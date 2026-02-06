import type { PaymentInfo } from '@prisma/generated/client'

export interface GetPaymentInfoUseCaseResponse {
  paymentInfo: PaymentInfo
}
