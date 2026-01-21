import { ApiError } from '@errors/api-error'
import { INSTITUTION_NOT_FOUND } from '@messages/responses/institution-responses.ts/4xx'

export class InstitutionNotFoundError extends ApiError {
  constructor() {
    super(INSTITUTION_NOT_FOUND)
  }
}
