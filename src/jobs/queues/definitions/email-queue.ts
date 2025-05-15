import type { EmailJobData } from '@custom-types/jobs/queues/definitions/email-queue'
import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { redisConnection } from '@lib/redis/helpers/configuration'
import { Queue } from 'bullmq'
import ms from 'ms'

export const emailQueue = new Queue<EmailJobData>(bullmqTokens.queues.user.emails, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 5,
    stackTraceLimit: 50,
    backoff: {
      type: 'exponential',
      delay: ms('1s'),
    },
    removeOnComplete: {
      count: 15,
    },
    removeOnFail: {
      count: 30,
    },
  },
})
