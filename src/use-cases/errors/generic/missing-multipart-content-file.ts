import { ApiError } from '@errors/api-error'
import { MISSING_MULTIPART_CONTENT_TYPE } from '@messages/responses/common-responses.ts/4xx'

export class MissingMultipartContentFile extends ApiError {
  constructor() {
    super(MISSING_MULTIPART_CONTENT_TYPE)
  }
}
