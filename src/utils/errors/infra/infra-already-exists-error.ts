import { SystemError } from '@errors/system-error'
import { INFRA_ALREADY_EXISTS } from '@messages/system/infra'

export class InfraAlreadyExistsError extends SystemError {
  constructor() {
    super(INFRA_ALREADY_EXISTS)
  }
}
