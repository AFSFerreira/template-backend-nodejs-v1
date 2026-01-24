import { ApiError } from '@errors/api-error'
import { EMAIL_CHANGE_NOT_REQUESTED } from '@messages/responses/user-responses.ts/4xx'

export class EmailChangeNotRequestedError extends ApiError {
  constructor() {
    super(EMAIL_CHANGE_NOT_REQUESTED)
  }
}
