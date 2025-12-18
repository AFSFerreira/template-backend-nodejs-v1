import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import { SystemError } from '@errors/system-error'
import { logger } from '@lib/logger'
import {
  PRESENTER_STRATEGY_ALREADY_EXISTS_LOG,
  PRESENTER_STRATEGY_NOT_FOUND_LOG,
} from '@messages/loggings/system-loggings'
import { PRESENTER_STRATEGY_ALREADY_EXISTS, PRESENTER_STRATEGY_NOT_FOUND } from '@messages/system/common-responses'

class PresenterRegistry {
  private strategies = new Map<string, IPresenterStrategy<unknown, unknown>>()

  public register(contextKey: string, strategy: IPresenterStrategy<unknown, unknown>): void {
    if (this.strategies.has(contextKey)) {
      logger.fatal({ contextKey }, PRESENTER_STRATEGY_ALREADY_EXISTS_LOG)
      throw new SystemError(PRESENTER_STRATEGY_ALREADY_EXISTS)
    }

    this.strategies.set(contextKey, strategy)
  }

  public get(contextKey: string): IPresenterStrategy<unknown, unknown> {
    const strategy = this.strategies.get(contextKey)

    if (!strategy) {
      logger.fatal({ contextKey }, PRESENTER_STRATEGY_NOT_FOUND_LOG)
      throw new SystemError(PRESENTER_STRATEGY_NOT_FOUND)
    }

    return strategy
  }
}

export const presenterRegistry = new PresenterRegistry()

export function RegisterPresenter(contextKey: string) {
  return function (target: new () => IPresenterStrategy<unknown, unknown>) {
    presenterRegistry.register(contextKey, new target())
  }
}
