import { ApiError } from '@errors/api-error'
import { INVALID_PROSE_MIRROR_CONTENT } from '@messages/responses/common-responses/4xx'

export class InvalidProseMirrorError extends ApiError {
  constructor() {
    super(INVALID_PROSE_MIRROR_CONTENT)
  }
}
