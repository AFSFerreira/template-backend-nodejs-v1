import { USER_WITH_SAME_IDENTITY_DOCUMENT } from '@messages/responses'
import { ApiError } from '../api-error'

export class UserWithSameIdentityDocument extends ApiError {
  constructor() {
    super(USER_WITH_SAME_IDENTITY_DOCUMENT)
  }
}
