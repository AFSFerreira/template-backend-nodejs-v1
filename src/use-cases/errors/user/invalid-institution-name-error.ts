import { INVALID_INSTITUTION_NAME } from '@messages/errors'
import { ApiError } from '../api-error'

export class InvalidInstitutionName extends ApiError {
  constructor() {
    super(INVALID_INSTITUTION_NAME.status, INVALID_INSTITUTION_NAME.body)
  }
}
