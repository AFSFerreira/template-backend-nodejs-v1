import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { IRegisterPresenter } from '@custom-types/lib/tsyringe/register-presenter'
import { logger } from '@lib/logger'
import { PresenterStrategyAlreadyExistsError } from '@lib/tsyringe/errors/presenters/presenter-strategy-already-exists-error'
import { PRESENTER_STRATEGY_ALREADY_EXISTS_LOG } from '@messages/loggings/system/system-loggings'

export function registerPresenter({ contextKey, container, target }: IRegisterPresenter) {
  if (container.isRegistered(contextKey)) {
    logger.fatal({ contextKey }, PRESENTER_STRATEGY_ALREADY_EXISTS_LOG)
    throw new PresenterStrategyAlreadyExistsError()
  }

  container.registerSingleton<IPresenterStrategy<unknown, unknown>>(contextKey, target)
}
