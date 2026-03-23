import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { logger } from '@lib/pino'
import { logError } from '@lib/pino/helpers/log-error'
import { redisConnection } from '@lib/redis/helpers/configuration'
import {
  SECURITY_JOB_STALLED,
  SECURITY_JOB_STARTING,
  SECURITY_OPERATION_FAILED,
  SECURITY_OPERATION_SUCCESS,
  SECURITY_WORKER_ERROR,
} from '@messages/loggings/jobs/queues/security'
import { Worker } from 'bullmq'
import ms from 'ms'
import { securityProcessor } from '../processors/security-processor'

export const securityWorker = new Worker(bullmqTokens.queues.user.security, securityProcessor, {
  connection: redisConnection,
  concurrency: 5,
  lockDuration: ms('30s'),
  lockRenewTime: ms('10s'),
  limiter: {
    max: 10,
    duration: ms('1s'),
  },
  drainDelay: 5,
})

securityWorker.on('active', (job) => {
  logger.info({ jobId: job.id, type: job.data.type }, SECURITY_JOB_STARTING)
})

securityWorker.on('completed', (job) => {
  logger.info({ jobId: job.id, type: job.data.type }, SECURITY_OPERATION_SUCCESS)
})

securityWorker.on('failed', (job, error) => {
  logError({
    error,
    context: {
      jobId: job?.id,
      type: job?.data.type,
    },
    message: SECURITY_OPERATION_FAILED,
  })
})

securityWorker.on('stalled', (jobId) => {
  logger.warn({ jobId }, SECURITY_JOB_STALLED)
})

securityWorker.on('error', (error) => {
  logError({ error, message: SECURITY_WORKER_ERROR })
})
