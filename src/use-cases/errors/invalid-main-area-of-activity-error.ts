import { messages } from '@/constants/messages'

export class InvalidAreaOfActivity extends Error {
  constructor(area?: string) {
    super(messages.errors.invalidAreaOfActivity + (area ?? ''))
  }
}
