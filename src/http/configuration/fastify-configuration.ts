import type { FastifyServerOptions } from 'fastify'
import { KB_IN_BYTES } from '@constants/size-constants'

export const fastifyConfiguration = {
  logger: false,
  trustProxy: ['127.0.0.1', '::1', '10.0.0.0/8'],
  bodyLimit: 100 * KB_IN_BYTES,
  routerOptions: {
    caseSensitive: true,
    ignoreTrailingSlash: true,
    maxParamLength: 256,
  },
} satisfies FastifyServerOptions
