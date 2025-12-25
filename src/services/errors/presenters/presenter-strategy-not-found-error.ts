import { SystemError } from '@errors/system-error'
import { PRESENTER_STRATEGY_NOT_FOUND } from '@messages/system/presenter'

export class PresenterStrategyNotFoundError extends SystemError {
  constructor() {
    super(PRESENTER_STRATEGY_NOT_FOUND)
  }
}
