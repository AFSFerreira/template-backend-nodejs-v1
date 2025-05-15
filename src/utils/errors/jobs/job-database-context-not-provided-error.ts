import { SystemError } from '@errors/system-error'
import { JOB_DATABASE_CONTEXT_NOT_PROVIDED } from '@messages/system/job-context'

export class JobDatabaseContextNotProvidedError extends SystemError {
  constructor() {
    super(JOB_DATABASE_CONTEXT_NOT_PROVIDED)
  }
}
