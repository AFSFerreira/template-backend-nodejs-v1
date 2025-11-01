import { INVALID_INSTITUTION_NAME } from '@messages/responses'
import { ApiError } from '../api-error'

export class InvalidInstitutionName extends ApiError {
  constructor() {
    super(INVALID_INSTITUTION_NAME)
  }
}
