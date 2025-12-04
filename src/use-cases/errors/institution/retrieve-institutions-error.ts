import { ApiError } from '@errors/api-error'
import { RETRIEVE_INSTITUTIONS_ERROR } from '@messages/responses/institution-responses'

export class RetrieveInstitutionsError extends ApiError {
  constructor() {
    super(RETRIEVE_INSTITUTIONS_ERROR)
  }
}
