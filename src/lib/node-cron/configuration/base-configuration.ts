import type { TaskOptions } from 'node-cron'
import { JOBS_TIMEZONE } from '@constants/jobs-configuration-constants'

export const BASIC_JOB_CONFIGURATION = {
  timezone: JOBS_TIMEZONE,
} satisfies TaskOptions
