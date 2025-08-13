import { messages } from '@/constants/messages'

export class InvalidActivityArea extends Error {
  constructor(area?: string) {
    super(
      messages.errors.invalidAreaOfActivity +
        (area !== undefined ? `: ${area}` : ''),
    )
  }
}
