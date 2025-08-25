import { messages } from '@constants/messages'

export class UserAlreadyHasAddressError extends Error {
  constructor() {
    super(messages.errors.userAlreadyHasAddress)
  }
}
