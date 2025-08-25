import { messages } from '@constants/messages'

export class EmptyUsersInfoError extends Error {
  constructor() {
    super(messages.errors.noUsersAvailable)
  }
}
