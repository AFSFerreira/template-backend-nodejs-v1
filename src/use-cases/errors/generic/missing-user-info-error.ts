import { ApiError } from '@errors/api-error'
import { MISSING_USER_INFO } from '@messages/responses/common-responses'

export class MissingUserInfoError extends ApiError {
  constructor() {
    super(MISSING_USER_INFO)
  }
}
