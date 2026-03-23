import type { DefaultJobOptions, WorkerOptions } from 'bullmq'
import ms from 'ms'

export const ERASE_FILES_CONCURRENCY = 10

export const BASE_JOB_QUEUE_CONFIGURATION = {
  removeOnComplete: {
    count: 100,
    age: ms('1h'),
  },
  removeOnFail: {
    count: 500,
  },
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: ms('5s'),
    jitter: 0.5,
  },
} as const satisfies DefaultJobOptions

export const BASE_JOB_WORKER_CONFIGURATION = {
  concurrency: 5,
} as const satisfies Omit<WorkerOptions, 'connection'>
