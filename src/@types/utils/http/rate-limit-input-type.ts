import type { FastifyRequest } from 'fastify'
import type { DurationString } from '../../custom/duration-string-type'

export interface RateLimitInput {
  max?: number
  timeWindow?: DurationString
  keyGenerator?: ((request: FastifyRequest) => string | number | Promise<string | number>) | undefined
}
