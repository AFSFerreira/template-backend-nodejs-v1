import { SystemError } from '@errors/system-error'
import { UNREACHABLE_CASE } from '@messages/system/unreachable-case'

export class UnreachableCaseError extends SystemError {
  constructor(value: never) {
    super({
      ...UNREACHABLE_CASE,
      issues: {
        receivedValue: value,
      },
    })
  }
}
