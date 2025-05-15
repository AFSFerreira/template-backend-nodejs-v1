import '@fastify/jwt'
import type { UserRoleType } from '@prisma/generated/enums'
import 'fastify'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: UserRoleType
      sub: string
    }
  }
}
