import type { JobFactory } from '@custom-types/lib/bullmq/job-factory'
import { setTimeout } from 'node:timers/promises'
import { BATCH_PROCESSING_DELAY } from '@constants/timing-constants'
import { JobDatabaseContextNotProvidedError } from '@services/errors/jobs/job-database-context-not-provided-error'
import dayjs from 'dayjs'

export const cleanupUserActionAuditsJobFactory: JobFactory = (ctx) => {
  return async () => {
    const databaseContext = ctx.dbContext

    if (!databaseContext) {
      throw new JobDatabaseContextNotProvidedError()
    }

    const thresholdDate = dayjs().subtract(5, 'year').toDate()

    while (true) {
      const result = await databaseContext.client.userActionAudit.deleteOldRecordsInBatches(
        'createdAt',
        thresholdDate,
        1000,
      )

      if (result === 0) break

      await setTimeout(BATCH_PROCESSING_DELAY)
    }
  }
}
