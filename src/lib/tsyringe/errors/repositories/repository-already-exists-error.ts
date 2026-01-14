import { SystemError } from '@errors/system-error'
import { REPOSITORY_ALREADY_EXISTS } from '@messages/system/repository'

export class RepositoryAlreadyExistsError extends SystemError {
  constructor() {
    super(REPOSITORY_ALREADY_EXISTS)
  }
}
