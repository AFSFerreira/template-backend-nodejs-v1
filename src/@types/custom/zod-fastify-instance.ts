import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export type ExtendedFastifyInstance = Parameters<FastifyPluginAsyncZod>[0]
