import type { JobFactory } from '@custom-types/lib/bullmq/job-factory'
import { setTimeout } from 'node:timers/promises'
import { JobDatabaseContextNotProvidedError } from '@services/errors/jobs/job-database-context-not-provided-error'

export const cleanupUserActionAuditsJobFactory: JobFactory = (ctx) => {
  return async () => {
    const databaseContext = ctx.dbContext

    if (!databaseContext) {
      throw new JobDatabaseContextNotProvidedError()
    }

    const thresholdDate = new Date()
    thresholdDate.setFullYear(thresholdDate.getFullYear() - 5)

    while (true) {
      const result = await databaseContext.client.userActionAudit.deleteOldRecordsInBatches(
        'createdAt',
        thresholdDate,
        1000,
      )

      if (result === 0) break

      await setTimeout(1000)
    }
  }
}
