import { ApiError } from '@errors/api-error'
import { INSTITUTIONAL_INFO_IMAGE_STORAGE_ERROR } from '@messages/responses/institutional-info-responses/5xx'

export class InstitutionalInfoImageStorageError extends ApiError {
  constructor() {
    super(INSTITUTIONAL_INFO_IMAGE_STORAGE_ERROR)
  }
}
