import type { VerifyPayloadTypeWithSub } from '@custom-types/utils/ws/get-socket-user-public-id'
import type { VerifyPayloadType } from '@fastify/jwt'

/**
 * Extrai o `id` do usuário a partir do payload JWT de uma conexão WebSocket.
 *
 * Em conexões WebSocket, o token JWT é verificado fora do ciclo de request do Fastify,
 * então o `sub` precisa ser extraído manualmente do payload decodificado.
 *
 * @param payload - Payload JWT decodificado da conexão WebSocket.
 * @returns `id` (campo `sub`) do usuário autenticado.
 */
export function getSocketUserId(payload: VerifyPayloadType) {
  const userId = (payload as VerifyPayloadTypeWithSub)?.sub as string
  return userId
}
