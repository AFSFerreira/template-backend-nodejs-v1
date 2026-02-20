import type { EmailJobData } from '@custom-types/jobs/queues/definitions/email-queue'
import { bullmqTokens } from '@lib/bullmq/helpers/bullmq-tokens'
import { redisConnection } from '@lib/redis/helpers/configuration'
import { Queue } from 'bullmq'
import ms from 'ms'

export const emailQueue = new Queue<EmailJobData>(bullmqTokens.queues.emails.user, {
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
