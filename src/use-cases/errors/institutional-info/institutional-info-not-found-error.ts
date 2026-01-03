import { ApiError } from '@errors/api-error'
import { INSTITUTIONAL_INFO_NOT_FOUND } from '@messages/responses/institutional-info-responses'

export class InstitutionalInfoNotFoundError extends ApiError {
  constructor() {
    super(INSTITUTIONAL_INFO_NOT_FOUND)
  }
}
