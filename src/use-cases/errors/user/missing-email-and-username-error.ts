import { MISSING_CHECK_AVAILABILITIES_INPUT } from '@messages/responses'
import { ApiError } from '../api-error'

export class MissingCheckAvailabilitiesInput extends ApiError {
  constructor() {
    super(MISSING_CHECK_AVAILABILITIES_INPUT)
  }
}
