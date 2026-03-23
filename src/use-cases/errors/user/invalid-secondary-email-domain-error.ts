import { ApiError } from '@errors/api-error'
import { INVALID_SECONDARY_EMAIL_DOMAIN } from '@messages/responses/user-responses/4xx'

export class InvalidSecondaryEmailDomainError extends ApiError {
  constructor() {
    super(INVALID_SECONDARY_EMAIL_DOMAIN)
  }
}
