import '@fastify/jwt'
import type { MembershipStatusType, UserRoleType } from '@prisma/generated/enums'
import 'fastify'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: UserRoleType
      status: MembershipStatusType
      sub: string
    }
  }
}
