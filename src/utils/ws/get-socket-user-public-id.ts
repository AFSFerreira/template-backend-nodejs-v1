import type { VerifyPayloadTypeWithSub } from '@custom-types/utils/ws/get-socket-user-public-id'
import type { VerifyPayloadType } from '@fastify/jwt'

export function getSocketUserPublicId(payload: VerifyPayloadType) {
  const userId = (payload as VerifyPayloadTypeWithSub)?.sub as string
  return userId
}
