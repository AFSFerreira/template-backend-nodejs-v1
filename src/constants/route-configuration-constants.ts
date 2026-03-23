import type { RouteOptions, RouteShorthandOptions } from 'fastify'
import { env } from '../env'
import { MB_IN_BYTES } from './size-constants'

export const BLOGS_PAYLOAD_LIMIT_SIZE = {
  bodyLimit: 10 * MB_IN_BYTES,
} as const satisfies RouteShorthandOptions

export const NEWSLETTER_PAYLOAD_LIMIT_SIZE = {
  bodyLimit: 10 * MB_IN_BYTES,
} as const satisfies RouteShorthandOptions

export const DIRECTORS_BOARD_PAYLOAD_LIMIT_SIZE = {
  bodyLimit: 10 * MB_IN_BYTES,
} as const satisfies RouteShorthandOptions

export const INSTITUTIONAL_INFO_PAYLOAD_LIMIT_SIZE = {
  bodyLimit: 10 * MB_IN_BYTES,
} as const satisfies RouteShorthandOptions

// ---------------------------------------------------- //

export const RATE_LIMIT_TIERS = {
  STANDARD: {
    max: env.RATE_LIMIT_STANDARD_MAX,
    timeWindow: '1m',
  },
  AUTH: {
    max: env.RATE_LIMIT_AUTH_MAX,
    timeWindow: '1m',
  },
  MUTATION: {
    max: env.RATE_LIMIT_MUTATION_MAX,
    timeWindow: '1m',
  },
  HEAVY: {
    max: env.RATE_LIMIT_HEAVY_MAX,
    timeWindow: '1m',
  },
  CREATE_RESOURCE: {
    max: env.RATE_LIMIT_CREATE_RESOURCE_MAX,
    timeWindow: '1m',
  },
} as const satisfies Record<string, NonNullable<RouteOptions['config']>['rateLimit']>
