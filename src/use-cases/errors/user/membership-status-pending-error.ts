import { ApiError } from '@errors/api-error'
import { PENDING_USER } from '@messages/responses/user-responses.ts/4xx'

export class MembershipStatusPendingError extends ApiError {
  constructor() {
    super(PENDING_USER)
  }
}
