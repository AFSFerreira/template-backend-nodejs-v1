import { messages } from '@constants/messages'

export class MissingCheckAvailabilitiesInput extends Error {
  constructor() {
    super(messages.errors.missingEmailAndUsername)
  }
}
