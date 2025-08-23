import { messages } from '@constants/messages'

export class UserWithSameEmailOrUsernameError extends Error {
  constructor() {
    super(messages.errors.userWithSameEmailOrPassword)
  }
}
