import type { JobFactory } from '@custom-types/lib/bullmq/job-factory'
import type { UsersRepository } from '@repositories/users-repository'
import { setTimeout } from 'node:timers/promises'
import { BATCH_PROCESSING_DELAY, VERIFYNG_ACCOUNT_ERASE_TIME_WINDOW } from '@constants/timing-constants'
import { logError } from '@lib/pino/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FAILED_TO_DELETE_EXPIRED_VERIFYING_USERS_BATCH } from '@messages/loggings/jobs/cron/database'
import dayjs from 'dayjs'
import { container } from 'tsyringe'

export const cleanupVerifyingUsersJobFactory: JobFactory = () => {
  return async () => {
    const usersRepository = container.resolve<UsersRepository>(tsyringeTokens.repositories.users)

    const thresholdDate = dayjs().subtract(VERIFYNG_ACCOUNT_ERASE_TIME_WINDOW, 'millisecond').toDate()

    const BATCH_SIZE = 1000

    while (true) {
      const ids = await usersRepository.listExpiredVerifyingUsers({
        thresholdDate,
        batchSize: BATCH_SIZE,
      })

      if (ids.length === 0) break

      try {
        await usersRepository.deleteManyById(ids)
      } catch (error) {
        logError({ error, context: { ids }, message: FAILED_TO_DELETE_EXPIRED_VERIFYING_USERS_BATCH })
        break
      }

      await setTimeout(BATCH_PROCESSING_DELAY)
    }
  }
}
