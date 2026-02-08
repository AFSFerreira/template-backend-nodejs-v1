import { ApiError } from '@errors/api-error'
import { INSTITUTION_ALREADY_EXISTS } from '@messages/responses/institution-responses/4xx'

export class InstitutionAlreadyExistsError extends ApiError {
  constructor() {
    super(INSTITUTION_ALREADY_EXISTS)
  }
}
