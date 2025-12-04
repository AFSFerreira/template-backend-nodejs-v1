import { ApiError } from '@errors/api-error'
import { IDENTITY_DOCUMENT_ALREADY_USED } from '@messages/responses/user-responses'

export class IdentityDocumentAlreadyUsed extends ApiError {
  constructor() {
    super(IDENTITY_DOCUMENT_ALREADY_USED)
  }
}
