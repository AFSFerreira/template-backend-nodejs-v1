import { ApiError } from '@errors/api-error'
import { INACTIVE_USER } from '@messages/responses/user-responses'

export class MembershipStatusInactiveError extends ApiError {
  constructor() {
    super(INACTIVE_USER)
  }
}
