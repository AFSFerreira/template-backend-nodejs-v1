import type { FileJobData } from '@custom-types/jobs/queues/definitions/file-processor'
import { bullmqTokens } from '@lib/bullmq/helpers/bullmq-tokens'
import { redisConnection } from '@lib/redis/helpers/configuration'
import { Queue } from 'bullmq'
import ms from 'ms'

export const fileQueue = new Queue<FileJobData>(bullmqTokens.queues.files.management, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: ms('5s'),
    },
    removeOnComplete: {
      age: ms('24h'),
      count: 1000,
    },
    removeOnFail: {
      age: ms('7d'),
    },
  },
})
