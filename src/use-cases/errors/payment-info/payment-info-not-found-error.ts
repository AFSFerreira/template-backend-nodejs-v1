import { ApiError } from '@errors/api-error'
import { PAYMENT_INFO_NOT_FOUND } from '@messages/responses/payment-info-responses.ts/4xx'

export class PaymentInfoNotFoundError extends ApiError {
  constructor() {
    super(PAYMENT_INFO_NOT_FOUND)
  }
}
