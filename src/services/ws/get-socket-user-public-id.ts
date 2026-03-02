import type { VerifyPayloadType } from '@fastify/jwt'

type VerifyPayloadTypeWithSub = VerifyPayloadType & { sub: string }

export function getSocketUserPublicId(payload: VerifyPayloadType) {
  const userId = (payload as VerifyPayloadTypeWithSub)?.sub as string
  return userId
}
