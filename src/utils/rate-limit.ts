import type { DurationString } from '@custom-types/duration-string-type'
import { RateLimitError } from '@use-cases/errors/generic/rate-limit-error'
import type { RouteOptions } from 'fastify'

export interface RateLimitInput {
  max?: number
  timeWindow?: DurationString
}

export function rateLimit({ max = 5, timeWindow }: RateLimitInput): Partial<RouteOptions> {
  return {
    config: {
      rateLimit: {
        max,
        timeWindow,
        keyGenerator: (request) => request.ip,
        errorResponseBuilder: () => new RateLimitError(),
      },
    },
  }
}
