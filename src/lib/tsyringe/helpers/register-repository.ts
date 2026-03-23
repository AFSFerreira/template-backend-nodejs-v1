import type { IRegisterRepository } from '@custom-types/lib/tsyringe/register-repository'
import { logger } from '@lib/pino'
import { RepositoryAlreadyExistsError } from '@lib/tsyringe/errors/repositories/repository-already-exists-error'
import { PRESENTER_STRATEGY_ALREADY_EXISTS_LOG } from '@messages/loggings/system/system-loggings'

export function registerRepository({ contextKey, container, target }: IRegisterRepository) {
  if (container.isRegistered(contextKey)) {
    logger.fatal({ contextKey }, PRESENTER_STRATEGY_ALREADY_EXISTS_LOG)
    throw new RepositoryAlreadyExistsError()
  }

  container.registerSingleton(contextKey, target)
}
