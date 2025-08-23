import { messages } from '@constants/messages'
import { ResourceNotFoundError } from './resource-not-found-error'

export class UserNotFoundError extends ResourceNotFoundError {
  constructor() {
    super(messages.errors.userNotFound)
  }
}
