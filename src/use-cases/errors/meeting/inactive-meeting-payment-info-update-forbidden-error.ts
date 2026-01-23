import { ApiError } from '@errors/api-error'
import { INACTIVE_MEETING_PAYMENT_INFO_UPDATE_FORBIDDEN } from '@messages/responses/meeting-responses.ts/4xx'

export class InactiveMeetingPaymentInfoUpdateForbiddenError extends ApiError {
  constructor() {
    super(INACTIVE_MEETING_PAYMENT_INFO_UPDATE_FORBIDDEN)
  }
}
