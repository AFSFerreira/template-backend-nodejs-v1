import { ApiError } from '@errors/api-error'
import { EMAILS_DO_NOT_MATCH } from '@messages/responses/user-responses.ts/4xx'

export class EmailsDoNotMatchError extends ApiError {
  constructor() {
    super(EMAILS_DO_NOT_MATCH)
  }
}
