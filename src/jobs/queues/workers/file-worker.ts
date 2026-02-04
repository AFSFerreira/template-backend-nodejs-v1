import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { redisConnection } from '@lib/redis/helpers/configuration'
import {
  FILE_JOB_STALLED,
  FILE_OPERATION_FAILED,
  FILE_OPERATION_STARTED,
  FILE_OPERATION_SUCCESS,
  FILE_WORKER_ERROR,
} from '@messages/loggings/jobs/queues/files'
import { Worker } from 'bullmq'
import ms from 'ms'
import { fileProcessor } from '../processors/file-processor'

export const fileWorker = new Worker(bullmqTokens.files.management, fileProcessor, {
  connection: redisConnection,
  concurrency: 10,
  lockDuration: ms('30s'),
  lockRenewTime: ms('10s'),
  limiter: {
    max: 5,
    duration: ms('1s'),
  },
  drainDelay: 5,
})

fileWorker.on('active', (job) => {
  logger.info({ jobId: job.id, type: job.data.type }, FILE_OPERATION_STARTED)
})

fileWorker.on('completed', (job) => {
  logger.info({ jobId: job.id, type: job.data.type }, FILE_OPERATION_SUCCESS)
})

fileWorker.on('failed', (job, error) => {
  const context = {
    jobId: job?.id,
    type: job?.data.type,
  }

  logError({ error, context, message: FILE_OPERATION_FAILED })
})

fileWorker.on('stalled', (jobId) => {
  logger.warn({ jobId }, FILE_JOB_STALLED)
})

fileWorker.on('error', (error) => {
  logError({ error, message: FILE_WORKER_ERROR })
})
