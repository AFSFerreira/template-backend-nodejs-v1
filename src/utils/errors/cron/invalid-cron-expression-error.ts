import { SystemError } from '@errors/system-error'
import { INVALID_CRON_ERROR } from '@messages/system/cron'

export class InvalidCronExpressionError extends SystemError {
  constructor(errors?: string[]) {
    super({
      ...INVALID_CRON_ERROR,
      issues: { errors },
    })
  }
}
