import { ApiError } from '@errors/api-error'
import { MEMBERSHIP_STATUS_NOT_PENDING } from '@messages/responses/user-responses.ts/4xx'

export class MembershipStatusNotPending extends ApiError {
  constructor() {
    super(MEMBERSHIP_STATUS_NOT_PENDING)
  }
}
