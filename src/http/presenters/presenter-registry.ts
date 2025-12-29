import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import { logger } from '@lib/logger'
import {
  PRESENTER_STRATEGY_ALREADY_EXISTS_LOG,
  PRESENTER_STRATEGY_NOT_FOUND_LOG,
} from '@messages/loggings/system-loggings'
import { PresenterStrategyAlreadyExistsError } from '@services/errors/presenters/presenter-strategy-already-exists-error'
import { PresenterStrategyNotFoundError } from '@services/errors/presenters/presenter-strategy-not-found-error'

class PresenterRegistry {
  private strategies = new Map<string, IPresenterStrategy<unknown, unknown>>()

  public register(contextKey: string, strategy: IPresenterStrategy<unknown, unknown>): void {
    if (this.strategies.has(contextKey)) {
      logger.fatal({ contextKey }, PRESENTER_STRATEGY_ALREADY_EXISTS_LOG)
      throw new PresenterStrategyAlreadyExistsError()
    }

    this.strategies.set(contextKey, strategy)
  }

  public get(contextKey: string): IPresenterStrategy<unknown, unknown> {
    const strategy = this.strategies.get(contextKey)

    if (!strategy) {
      logger.fatal({ contextKey }, PRESENTER_STRATEGY_NOT_FOUND_LOG)
      throw new PresenterStrategyNotFoundError()
    }

    return strategy
  }
}

export const presenterRegistry = new PresenterRegistry()

export function RegisterPresenter(contextKey: string) {
  return (target: new () => IPresenterStrategy<unknown, unknown>) => {
    presenterRegistry.register(contextKey, new target())
  }
}
