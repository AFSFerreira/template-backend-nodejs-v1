import { USER_NOT_FOUND } from '@messages/errors'
import { ResourceNotFoundError } from '../generic/resource-not-found-error'

export class UserNotFoundError extends ResourceNotFoundError {
  constructor() {
    super(USER_NOT_FOUND.body.message)
  }
}
