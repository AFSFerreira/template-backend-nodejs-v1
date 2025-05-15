import type { FileJobLogging } from '@custom-types/custom/file-job-logging'
import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { logger } from '@lib/pino'
import { logError } from '@lib/pino/helpers/log-error'
import { redisConnection } from '@lib/redis/helpers/configuration'
import {
  EMAIL_JOB_STALLED,
  EMAIL_JOB_STARTING,
  EMAIL_SENDING_FAILED,
  EMAIL_SENT_SUCCESSFULLY,
  EMAIL_WORKER_ERROR,
} from '@messages/loggings/jobs/queues/emails'
import { Worker } from 'bullmq'
import ms from 'ms'
import { emailProcessor } from '../processors/email-processor'

export const emailWorker = new Worker(bullmqTokens.queues.user.emails, emailProcessor, {
  connection: redisConnection,
  concurrency: 25,
  lockDuration: ms('30s'),
  lockRenewTime: ms('10s'),
  limiter: {
    max: 10,
    duration: ms('1s'),
  },
  drainDelay: 5,
  // metrics: {
  //   maxDataPoints: MetricsTime.ONE_WEEK * 2,
  // },
})

emailWorker.on('active', (job) => {
  logger.info({ to: job.data.to, jobId: job.id }, EMAIL_JOB_STARTING)
})

emailWorker.on('completed', (job, result) => {
  logger.info({ to: job.data.to, jobId: job.id, result }, EMAIL_SENT_SUCCESSFULLY)
})

emailWorker.on('failed', (job, error) => {
  const logMeta: Partial<FileJobLogging['logging']> = job?.data?.logging || {}

  const message = logMeta?.errorMessage || EMAIL_SENDING_FAILED

  const context = {
    to: job?.data.to,
    jobId: job?.id,
    error: error.message,
    ...(logMeta?.context || {}),
  }

  logError({ context, error, message })
})

emailWorker.on('stalled', (jobId) => {
  logger.warn({ jobId }, EMAIL_JOB_STALLED)
})

emailWorker.on('error', (error) => {
  logError({ error, message: EMAIL_WORKER_ERROR })
})
