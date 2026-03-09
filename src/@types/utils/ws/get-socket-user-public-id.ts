import type { VerifyPayloadType } from '@fastify/jwt'
import type { UserRoleType } from '@prisma/generated/enums'

export type VerifyPayloadTypeWithSub = VerifyPayloadType & { sub: string; role: UserRoleType; exp: number }
