import type { IRegisterRepository } from '@custom-types/libs/tsyringe/register-repository'
import { logger } from '@lib/logger'
import { PRESENTER_STRATEGY_ALREADY_EXISTS_LOG } from '@messages/loggings/system-loggings'
import { RepositoryAlreadyExistsError } from '@services/errors/presenters/repository-already-exists-error'

export function registerRepository({ contextKey, container, target }: IRegisterRepository) {
  if (container.isRegistered(contextKey)) {
    logger.fatal({ contextKey }, PRESENTER_STRATEGY_ALREADY_EXISTS_LOG)
    throw new RepositoryAlreadyExistsError()
  }

  container.registerSingleton(contextKey, target)
}
