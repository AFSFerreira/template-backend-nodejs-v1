import { ApiError } from '@errors/api-error'
import { INVALID_PROSE_MIRROR_IMAGE_LINK } from '@messages/responses/common-responses.ts/4xx'

export class InvalidProseMirrorImageLinkError extends ApiError {
  constructor() {
    super(INVALID_PROSE_MIRROR_IMAGE_LINK)
  }
}
