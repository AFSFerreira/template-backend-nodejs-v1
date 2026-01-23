import { SystemError } from '@errors/system-error'
import { INVALID_FILE_OPERATION_TYPE } from '@messages/jobs/workers/file-worker'

export class InvalidFileOperationTypeError extends SystemError {
  constructor(operationType: string) {
    super({
      ...INVALID_FILE_OPERATION_TYPE,
      issues: {
        operationType,
      },
    })
  }
}
