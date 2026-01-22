import { ApiError } from '@errors/api-error'
import { EMAIL_VERIFICATION_NOT_REQUESTED } from '@messages/responses/user-responses.ts/4xx'

export class EmailVerificationNotRequestedError extends ApiError {
  constructor() {
    super(EMAIL_VERIFICATION_NOT_REQUESTED)
  }
}
