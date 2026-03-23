import type { SecurityJobData } from '@custom-types/jobs/queues/definitions/security-queue'
import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { redisConnection } from '@lib/redis/helpers/configuration'
import { Queue } from 'bullmq'
import ms from 'ms'

export const securityQueue = new Queue<SecurityJobData>(bullmqTokens.queues.user.security, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    stackTraceLimit: 50,
    backoff: {
      type: 'exponential',
      delay: ms('2s'),
    },
    removeOnComplete: {
      count: 15,
    },
    removeOnFail: {
      count: 30,
    },
  },
})
