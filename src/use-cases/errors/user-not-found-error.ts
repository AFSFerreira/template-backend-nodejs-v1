import { ResourceNotFoundError } from './resource-not-found-error'
import { messages } from '@/constants/messages'

export class UserNotFoundError extends ResourceNotFoundError {
  constructor() {
    super(messages.errors.userNotFound)
  }
}
