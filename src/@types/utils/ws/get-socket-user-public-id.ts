import type { VerifyPayloadType } from '@fastify/jwt'

export type VerifyPayloadTypeWithSub = VerifyPayloadType & { sub: string }
