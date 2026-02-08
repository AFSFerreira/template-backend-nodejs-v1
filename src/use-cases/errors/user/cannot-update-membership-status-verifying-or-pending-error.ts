import { ApiError } from '@errors/api-error'
import { CANNOT_UPDATE_MEMBERSHIP_STATUS_VERIFYING_OR_PENDING } from '@messages/responses/user-responses.ts/update-membership-4xx'

export class CannotUpdateMembershipStatusVerifyingOrPendingError extends ApiError {
  constructor() {
    super(CANNOT_UPDATE_MEMBERSHIP_STATUS_VERIFYING_OR_PENDING)
  }
}
