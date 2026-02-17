import { ApiError } from '@errors/api-error'
import { INVALID_PAYMENT_LIMIT_DATE } from '@messages/responses/meeting-responses/4xx'

export class InvalidPaymentLimitDateError extends ApiError {
  constructor() {
    super(INVALID_PAYMENT_LIMIT_DATE)
  }
}
