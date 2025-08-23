import { messages } from '@constants/messages'

export class InvalidInstitutionName extends Error {
  constructor() {
    super(messages.errors.invalidInstitutionName)
  }
}
