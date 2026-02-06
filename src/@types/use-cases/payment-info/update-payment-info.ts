import type { UpdatePaymentInfoBodySchemaType } from '@custom-types/http/schemas/payment-info/update-payment-info-body-schema'
import type { PaymentInfo } from '@prisma/generated/client'

export interface UpdatePaymentInfoUseCaseRequest {
  data: UpdatePaymentInfoBodySchemaType
}

export interface UpdatePaymentInfoUseCaseResponse {
  paymentInfo: PaymentInfo
}
