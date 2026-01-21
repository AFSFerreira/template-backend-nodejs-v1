import { ApiError } from '@errors/api-error'
import { USER_WITH_SAME_IDENTITY_DOCUMENT } from '@messages/responses/user-responses.ts/4xx'

export class UserWithSameIdentityDocument extends ApiError {
  constructor() {
    super(USER_WITH_SAME_IDENTITY_DOCUMENT)
  }
}
