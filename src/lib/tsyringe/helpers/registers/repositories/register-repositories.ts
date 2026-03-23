import type { DependencyContainer } from 'tsyringe'
import { PrismaAuthenticationAuditsRepository } from '@repositories/prisma/prisma-authentication-audits-repository'
import { PrismaUserActionAuditsRepository } from '@repositories/prisma/prisma-user-action-audits-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { registerRepository } from '../../register-repository'
import { tsyringeTokens } from '../../tokens'

export function registerRepositories(container: DependencyContainer) {
  registerRepository({
    contextKey: tsyringeTokens.repositories.authenticationAudits,
    container,
    target: PrismaAuthenticationAuditsRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.userActionAudits,
    container,
    target: PrismaUserActionAuditsRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.users,
    container,
    target: PrismaUsersRepository,
  })
}
