import type { VerifyPayloadTypeWithSub } from '@custom-types/utils/ws/get-socket-user-public-id'
import type { VerifyPayloadType } from '@fastify/jwt'
import type { UserRoleType } from '@prisma/generated/enums'

/**
 * Extrai o `role` do usuário a partir do payload JWT de uma conexão WebSocket.
 *
 * Em conexões WebSocket, o token JWT é verificado fora do ciclo de request do Fastify,
 * então o `sub` precisa ser extraído manualmente do payload decodificado.
 *
 * @param payload - Payload JWT decodificado da conexão WebSocket.
 * @returns `role` (campo `role`) do usuário autenticado.
 */
export function getSocketUserRole(payload: VerifyPayloadType) {
  const role = (payload as VerifyPayloadTypeWithSub)?.role as UserRoleType
  return role
}
