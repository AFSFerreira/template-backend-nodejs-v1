import { ApiError } from '@errors/api-error'
import { DECRYPTION_FAILED } from '@messages/responses/common-responses/5xx'

export class DecryptionFailedError extends ApiError {
  constructor() {
    super(DECRYPTION_FAILED)
  }
}
