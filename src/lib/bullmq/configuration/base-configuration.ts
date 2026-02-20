import type { TaskOptions } from 'node-cron'
import { JOBS_TIMEZONE } from '@constants/jobs-configuration-constants'
import ms from 'ms'

export const BASIC_JOB_CONFIGURATION = {
  timezone: JOBS_TIMEZONE,
  maxRandomDelay: ms('30s'),
} as const satisfies TaskOptions
