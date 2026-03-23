import type { SecurityJobData } from '@custom-types/jobs/queues/definitions/security-queue'
import type { AuthenticationAuditsRepository } from '@repositories/authentication-audits-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { Job } from 'bullmq'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UpgradeUserPasswordHashUseCase } from '@use-cases/user/upgrade-user-password-hash'
import { container } from 'tsyringe'

export async function securityProcessor(job: Job<SecurityJobData>): Promise<void> {
  switch (job.data.type) {
    case 'upgrade-password-hash': {
      const useCase = container.resolve(UpgradeUserPasswordHashUseCase)

      await useCase.execute({
        userId: job.data.userId,
        password: job.data.password,
      })

      break
    }

    case 'increment-login-attempts': {
      const usersRepository = container.resolve<UsersRepository>(tsyringeTokens.repositories.users)

      await usersRepository.incrementLoginAttempts(job.data.userId)

      break
    }

    case 'reset-login-attempts': {
      const usersRepository = container.resolve<UsersRepository>(tsyringeTokens.repositories.users)

      await usersRepository.resetLoginAttempts(job.data.userId)

      break
    }

    case 'set-last-login': {
      const usersRepository = container.resolve<UsersRepository>(tsyringeTokens.repositories.users)

      await usersRepository.setLastLogin(job.data.userId)

      break
    }

    case 'create-authentication-audit': {
      const authAuditsRepository = container.resolve<AuthenticationAuditsRepository>(
        tsyringeTokens.repositories.authenticationAudits,
      )

      await authAuditsRepository.create(job.data.audit)

      break
    }
  }
}
