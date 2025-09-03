import { MISSING_CHECK_AVAILABILITIES_INPUT } from '@messages/errors'
import { ApiError } from '../api-error'

export class MissingCheckAvailabilitiesInput extends ApiError {
  constructor() {
    super(
      MISSING_CHECK_AVAILABILITIES_INPUT.status,
      MISSING_CHECK_AVAILABILITIES_INPUT.body,
    )
  }
}
