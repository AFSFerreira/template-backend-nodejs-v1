import { IDENTITY_DOCUMENT_ALREADY_USED } from '@messages/errors'
import { ApiError } from '../api-error'

export class IdentityDocumentAlreadyUsed extends ApiError {
  constructor() {
    super(
      IDENTITY_DOCUMENT_ALREADY_USED.status,
      IDENTITY_DOCUMENT_ALREADY_USED.body,
    )
  }
}
