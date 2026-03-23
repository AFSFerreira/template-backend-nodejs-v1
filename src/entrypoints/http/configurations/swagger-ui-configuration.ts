import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui'

export const swaggerUiConfiguration = {
  routePrefix: '/docs',
} as const satisfies FastifySwaggerUiOptions
