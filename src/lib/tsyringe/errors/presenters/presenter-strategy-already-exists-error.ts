import { SystemError } from '@errors/system-error'
import { PRESENTER_STRATEGY_ALREADY_EXISTS } from '@messages/system/presenter'

export class PresenterStrategyAlreadyExistsError extends SystemError {
  constructor() {
    super(PRESENTER_STRATEGY_ALREADY_EXISTS)
  }
}
