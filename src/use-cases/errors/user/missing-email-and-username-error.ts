import { ApiError } from '@errors/api-error'
import { MISSING_CHECK_AVAILABILITIES_INPUT } from '@messages/responses/user-responses/4xx'

export class MissingCheckAvailabilitiesInput extends ApiError {
  constructor() {
    super(MISSING_CHECK_AVAILABILITIES_INPUT)
  }
}
