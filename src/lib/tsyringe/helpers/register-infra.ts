import type { IRegisterInfra } from '@custom-types/libs/tsyringe/register-infra'
import { logger } from '@lib/logger'
import { INFRA_ALREADY_EXISTS_LOG } from '@messages/loggings/system-loggings'
import { InfraAlreadyExistsError } from '@services/errors/infra/infra-already-exists-error'

export function registerInfra({ contextKey, container, target }: IRegisterInfra) {
  if (container.isRegistered(contextKey)) {
    logger.fatal({ contextKey }, INFRA_ALREADY_EXISTS_LOG)
    throw new InfraAlreadyExistsError()
  }

  container.registerSingleton(contextKey, target)
}
