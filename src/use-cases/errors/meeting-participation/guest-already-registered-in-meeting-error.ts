import { GUEST_ALREADY_REGISTERED_IN_MEETING } from "@messages/response"
import { ApiError } from "../api-error"

export class GuestAlreadyRegisteredInMeetingError extends ApiError {
  constructor() {
    super(GUEST_ALREADY_REGISTERED_IN_MEETING)
  }
}
