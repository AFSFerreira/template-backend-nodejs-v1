import { ApiError } from '@errors/api-error'
import { INVALID_EMAIL_DOMAIN } from '@messages/responses/user-responses/4xx'

export class InvalidEmailDomainError extends ApiError {
  constructor() {
    super(INVALID_EMAIL_DOMAIN)
  }
}
