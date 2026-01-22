import type { UpdatePaymentInfoQuery } from '@custom-types/repository/prisma/payment-info/update-payment-info-query'
import type { PaymentInfo } from '@prisma/client'

export interface PaymentInfoRepository {
  getPaymentInfo: () => Promise<PaymentInfo | null>
  update: (query: UpdatePaymentInfoQuery) => Promise<PaymentInfo>
}
