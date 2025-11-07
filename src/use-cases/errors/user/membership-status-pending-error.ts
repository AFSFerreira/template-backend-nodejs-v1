import { PENDING_USER } from '@messages/responses'
import { ApiError } from '../api-error'

export class MembershipStatusPendingError extends ApiError {
  constructor() {
    super(PENDING_USER)
  }
}
