import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export type ZodFastifyInstance = Parameters<FastifyPluginAsyncZod>[0]
