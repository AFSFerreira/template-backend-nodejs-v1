import { env } from '@env/index'
import jwt from 'jsonwebtoken'

/**
 * Verifica e decodifica um token JWT de forma isolada (sem contexto Fastify).
 *
 * Utilizado em contextos onde o Fastify não está disponível, como WebSocket
 * handlers e background jobs que precisam validar tokens.
 *
 * @param token - Token JWT a ser verificado.
 * @returns Payload decodificado do token.
 * @throws {JsonWebTokenError} Se o token for inválido.
 * @throws {TokenExpiredError} Se o token estiver expirado.
 */
export function verifyTokenIsolated(token: string) {
  const decoded = jwt.verify(token, env.JWT_SECRET)

  return decoded
}
