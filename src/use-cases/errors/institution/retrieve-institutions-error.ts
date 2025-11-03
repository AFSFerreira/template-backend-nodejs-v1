import { RETRIEVE_INSTITUTIONS_ERROR } from '@messages/responses'
import { ApiError } from '../api-error'

export class RetrieveInstitutionsError extends ApiError {
  constructor() {
    super(RETRIEVE_INSTITUTIONS_ERROR)
  }
}
