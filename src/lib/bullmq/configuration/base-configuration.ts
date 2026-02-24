import type { TaskOptions } from 'node-cron'
import { SYSTEM_TIMEZONE } from '@constants/timezone-constants'
import ms from 'ms'

export const BASIC_JOB_CONFIGURATION = {
  timezone: SYSTEM_TIMEZONE,
  maxRandomDelay: ms('30s'),
} as const satisfies TaskOptions
