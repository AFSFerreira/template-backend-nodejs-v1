import { messages } from '@/constants/messages'

export class InvalidMainAreaOfActivity extends Error {
  constructor() {
    super(messages.errors.invalidAreaOfActivity)
  }
}
