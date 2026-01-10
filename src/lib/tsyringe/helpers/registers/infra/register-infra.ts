import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { registerInfra } from '@lib/tsyringe/helpers/register-infra'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import type { DependencyContainer } from 'tsyringe'

export function registerInfraServices(container: DependencyContainer) {
  registerInfra({
    contextKey: tokens.infra.database,
    container,
    target: DatabaseContext,
  })
}
