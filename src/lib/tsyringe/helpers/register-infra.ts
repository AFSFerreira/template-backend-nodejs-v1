import type { IRegisterInfra } from '@custom-types/lib/tsyringe/register-infra'
import { logger } from '@lib/pino'
import { InfraAlreadyExistsError } from '@lib/tsyringe/errors/infra/infra-already-exists-error'
import { INFRA_ALREADY_EXISTS_LOG } from '@messages/loggings/system/system-loggings'

export function registerInfra({ contextKey, container, target }: IRegisterInfra) {
  if (container.isRegistered(contextKey)) {
    logger.fatal({ contextKey }, INFRA_ALREADY_EXISTS_LOG)
    throw new InfraAlreadyExistsError()
  }

  container.registerSingleton(contextKey, target)
}
