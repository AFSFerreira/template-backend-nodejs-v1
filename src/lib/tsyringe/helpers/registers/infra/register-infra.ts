import type { DependencyContainer } from 'tsyringe'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { redis } from '@lib/redis'
import { registerInfra } from '@lib/tsyringe/helpers/register-infra'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerInfraServices(container: DependencyContainer) {
  registerInfra({
    contextKey: tsyringeTokens.infra.database,
    container,
    target: DatabaseContext,
  })

  container.registerInstance(tsyringeTokens.providers.redis, redis)
}
