import { messages } from '@constants/messages'

export class UserImageStorageError extends Error {
  constructor() {
    super(messages.errors.userImageStorage)
  }
}
