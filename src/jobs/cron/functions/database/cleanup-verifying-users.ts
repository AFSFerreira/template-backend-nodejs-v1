import type { JobFactory } from '@custom-types/lib/bullmq/job-factory'
import type { UsersRepository } from '@repositories/users-repository'
import { setTimeout } from 'node:timers/promises'
import { VERIFYNG_ACCOUNT_ERASE_TIME_WINDOW } from '@constants/timing-constants'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { JobDatabaseContextNotProvidedError } from '@services/errors/jobs/job-database-context-not-provided-error'
import { container } from 'tsyringe'

export const cleanupVerifyingUsersJobFactory: JobFactory = (ctx) => {
  return async () => {
    const databaseContext = ctx.dbContext

    if (!databaseContext) {
      throw new JobDatabaseContextNotProvidedError()
    }

    const usersRepository = container.resolve<UsersRepository>(tsyringeTokens.repositories.users)

    const thresholdDate = new Date(Date.now() - VERIFYNG_ACCOUNT_ERASE_TIME_WINDOW)

    while (true) {
      const { deletedCount } = await databaseContext.runInTransaction(async () => {
        const deletedCount = await usersRepository.deleteExpiredVerifyingUsers(thresholdDate)
        return { deletedCount }
      })

      if (deletedCount === 0) break

      await setTimeout(1000)
    }
  }
}
