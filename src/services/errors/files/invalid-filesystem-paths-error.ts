import { SystemError } from '@errors/system-error'
import { INVALID_FILESYSTEM_PATHS } from '@messages/system/files'

export class InvalidFilesystemPathsError extends SystemError {
  constructor(failedPaths?: string[]) {
    super({
      ...INVALID_FILESYSTEM_PATHS,
      issues: { failedPaths },
    })
  }
}
