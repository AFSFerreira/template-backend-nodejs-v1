import type { JobFactory } from '@custom-types/lib/node-cron/job-factory'
import { setTimeout } from 'node:timers/promises'
import { JobDatabaseContextNotProvidedError } from '@services/errors/jobs/job-database-context-not-provided-error'

export const cleanupAuditsJobFactory: JobFactory = (ctx) => {
  return async () => {
    const databaseContext = ctx.dbContext

    if (!databaseContext) {
      throw new JobDatabaseContextNotProvidedError()
    }

    const thresholdDate = new Date()
    thresholdDate.setMonth(thresholdDate.getMonth() - 6)

    while (true) {
      const result = await databaseContext.client.authenticationAudit.deleteOldRecordsInBatches(
        'createdAt',
        thresholdDate,
        1000,
      )

      if (result === 0) break

      await setTimeout(1000)
    }
  }
}
