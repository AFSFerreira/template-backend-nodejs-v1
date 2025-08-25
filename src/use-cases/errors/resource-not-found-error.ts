import { messages } from '@constants/messages'

export class ResourceNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? messages.errors.resourceNotFound)
  }
}
