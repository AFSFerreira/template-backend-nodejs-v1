import type { FileJobData } from '@custom-types/jobs/queues/definitions/file-processor'
import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { redisConnection } from '@lib/redis/helpers/configuration'
import { Queue } from 'bullmq'
import ms from 'ms'

export const fileQueue = new Queue<FileJobData>(bullmqTokens.files.management, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: ms('2s'),
    },
    removeOnComplete: {
      count: 20,
    },
    removeOnFail: {
      count: 50,
    },
  },
})
