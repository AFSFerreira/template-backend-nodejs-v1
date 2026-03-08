import { SystemError } from '@errors/system-error'
import { JOB_NAME_ALREADY_EXISTS } from '@messages/system/job'

export class JobNameAlreadyExistsError extends SystemError {
  constructor(jobName: string) {
    super({
      ...JOB_NAME_ALREADY_EXISTS,
      message: `O job ${jobName} registrado já existe`,
    })
  }
}
