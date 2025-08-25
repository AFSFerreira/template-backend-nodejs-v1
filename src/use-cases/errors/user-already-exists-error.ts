import { messages } from '@constants/messages'

export class UserAlreadyExistsError extends Error {
  constructor() {
    super(messages.errors.userAlreadyExists)
  }
}
