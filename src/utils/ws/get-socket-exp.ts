import type { VerifyPayloadTypeWithSub } from '@custom-types/utils/ws/get-socket-user-public-id'
import type { VerifyPayloadType } from '@fastify/jwt'

/**
 * Extrai o tempo de expiração (`exp`) a partir do payload JWT de uma conexão WebSocket.
 *
 * Em conexões WebSocket, o token JWT é verificado fora do ciclo de request do Fastify,
 * então o `exp` precisa ser extraído manualmente do payload decodificado.
 *
 * @param payload - Payload JWT decodificado da conexão WebSocket.
 * @returns Timestamp Unix de expiração do token.
 */
export function getSocketExp(payload: VerifyPayloadType) {
  const exp = (payload as VerifyPayloadTypeWithSub)?.exp as number
  return exp
}
