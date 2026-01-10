import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { IRegisterPresenter } from '@custom-types/libs/tsyringe/register-presenter'
import { logger } from '@lib/logger'
import { PRESENTER_STRATEGY_ALREADY_EXISTS_LOG } from '@messages/loggings/system-loggings'
import { PresenterStrategyAlreadyExistsError } from '@services/errors/presenters/presenter-strategy-already-exists-error'

export function registerPresenter({ contextKey, container, target }: IRegisterPresenter) {
  if (container.isRegistered(contextKey)) {
    logger.fatal({ contextKey }, PRESENTER_STRATEGY_ALREADY_EXISTS_LOG)
    throw new PresenterStrategyAlreadyExistsError()
  }

  container.registerSingleton<IPresenterStrategy<unknown, unknown>>(contextKey, target)
}
