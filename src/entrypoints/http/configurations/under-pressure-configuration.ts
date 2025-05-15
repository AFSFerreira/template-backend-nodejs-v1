import type { FastifyUnderPressureOptions } from '@fastify/under-pressure'
import { MB_IN_BYTES } from '@constants/size-constants'
import { env } from '@env/index'
import { UNAVAILABLE_SERVICE } from '@messages/loggings/system/system-loggings'

export const underPressureConfiguration = {
  maxHeapUsedBytes: Math.floor(env.MAX_RAM_MB * 0.8) * MB_IN_BYTES,
  maxRssBytes: Math.floor(env.MAX_RAM_MB * 0.9) * MB_IN_BYTES,
  maxEventLoopDelay: 1500,
  message: UNAVAILABLE_SERVICE,
  retryAfter: 30,
} as const satisfies FastifyUnderPressureOptions
