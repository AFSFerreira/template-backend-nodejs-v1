import type { RateLimitInput } from '@custom-types/utils/http/rate-limit-input-type'
import type { RouteOptions } from 'fastify'
import { RateLimitError } from '@use-cases/errors/generic/rate-limit-error'
import { getClientIp } from './get-client-ip'

export function rateLimit({
  max = 5,
  timeWindow = '1m',
  keyGenerator = (request) => getClientIp(request),
}: RateLimitInput): Partial<RouteOptions> {
  return {
    config: {
      rateLimit: {
        max,
        timeWindow,
        keyGenerator,
        errorResponseBuilder: () => new RateLimitError(),
      },
    },
  }
}
