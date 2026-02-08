import { ApiError } from '@errors/api-error'
import { RETRIEVE_INSTITUTIONS_ERROR } from '@messages/responses/institution-responses/5xx'

export class RetrieveInstitutionsError extends ApiError {
  constructor() {
    super(RETRIEVE_INSTITUTIONS_ERROR)
  }
}
