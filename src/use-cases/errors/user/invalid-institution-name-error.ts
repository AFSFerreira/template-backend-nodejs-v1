import { ApiError } from '@errors/api-error'
import { INVALID_INSTITUTION_NAME } from '@messages/responses/institution-responses.ts/4xx'

export class InvalidInstitutionName extends ApiError {
  constructor() {
    super(INVALID_INSTITUTION_NAME)
  }
}
