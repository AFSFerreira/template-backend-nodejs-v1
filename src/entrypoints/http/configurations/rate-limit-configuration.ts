import type { RateLimitPluginOptions } from '@fastify/rate-limit'
import { redis } from '@lib/redis'
import { RateLimitError } from '@use-cases/errors/generic/rate-limit-error'

export const rateLimitConfigurations = {
  redis,
  global: false,
  errorResponseBuilder: () => new RateLimitError(),
} as const satisfies RateLimitPluginOptions
