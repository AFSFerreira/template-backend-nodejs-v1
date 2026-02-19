import type { DefaultJobOptions, WorkerOptions } from 'bullmq'
import ms from 'ms'

export const JOBS_TIMEZONE = 'America/Sao_Paulo'
export const ERASE_FILES_CONCURRENCY = 10

export const BASE_JOB_QUEUE_CONFIGURATION = {
  removeOnComplete: true,
  removeOnFail: false,
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: ms('5s'),
    jitter: ms('10s'),
  },
} as const satisfies DefaultJobOptions

export const BASE_JOB_WORKER_CONFIGURATION = {
  concurrency: 5,
} as const satisfies Omit<WorkerOptions, 'connection'>
