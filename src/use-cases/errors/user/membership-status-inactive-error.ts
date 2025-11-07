import { INACTIVE_USER } from "@messages/responses"
import { ApiError } from "../api-error"

export class MembershipStatusInactiveError extends ApiError {
  constructor() {
    super(INACTIVE_USER)
  }
}
