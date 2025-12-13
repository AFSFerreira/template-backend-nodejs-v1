import type { FastifyStaticOptions } from '@fastify/static'

export const staticRouteConfigurations = {
  decorateReply: false,
  serveDotFiles: false,
  cacheControl: true,
  immutable: true,
  maxAge: '1y',
} satisfies FastifyStaticOptions
