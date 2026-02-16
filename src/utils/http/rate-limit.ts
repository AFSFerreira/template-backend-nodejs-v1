import type { RateLimitInput } from '@custom-types/utils/http/rate-limit-input-type'
import type { RouteOptions } from 'fastify'
import { rateLimitKeyGenerator } from './rate-limit-key-generator'

export function rateLimit({
  max = 20,
  timeWindow = '1m',
  keyGenerator = rateLimitKeyGenerator,
}: RateLimitInput): Partial<RouteOptions> {
  return {
    config: {
      rateLimit: {
        max,
        timeWindow,
        keyGenerator,
      },
    },
  }
}
