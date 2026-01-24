import type { EmailJobData } from '@custom-types/jobs/queues/definitions/email-queue'
import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import {
  EMAIL_JOB_ENQUEUED_SUCCESSFULLY,
  ENQUEUING_EMAIL_JOB,
  FAILED_TO_ENQUEUE_EMAIL_JOB,
} from '@messages/loggings/jobs/queues/emails'
import { emailQueue } from '../definitions/email-queue'

export async function sendEmailEnqueued(input: EmailJobData) {
  logger.info(ENQUEUING_EMAIL_JOB)

  try {
    const job = await emailQueue.add(bullmqTokens.tasksNames.email, input)

    logger.info(
      {
        jobId: job.id,
      },
      EMAIL_JOB_ENQUEUED_SUCCESSFULLY,
    )

    return job
  } catch (error) {
    logError({
      error,
      message: FAILED_TO_ENQUEUE_EMAIL_JOB,
    })

    return null
  }
}
