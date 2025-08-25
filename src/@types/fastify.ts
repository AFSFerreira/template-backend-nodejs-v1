import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    userPublicId?: string
  }
}
