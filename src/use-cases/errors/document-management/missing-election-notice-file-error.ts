import { ApiError } from '@errors/api-error'
import { RESOURCE_NOT_FOUND } from '@messages/responses/common-responses.ts/4xx'

export class MissingElectionNoticeFileError extends ApiError {
  constructor() {
    super(RESOURCE_NOT_FOUND)
  }
}
