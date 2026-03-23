import type { AuthTokensResult } from '@custom-types/services/http/auth-tokens-result'
import type { BuildAuthTokensParams } from '@custom-types/services/http/build-auth-tokens-params'
import { env } from '@env/index'

/**
 * Gera tokens JWT de acesso e refresh, configurando o cookie `refreshToken` na resposta.
 *
 * O `accessToken` é retornado no body da resposta para uso no header `Authorization`.
 * O `refreshToken` é configurado como cookie `httpOnly` com proteções:
 * - `secure`: habilitado apenas em produção (HTTPS).
 * - `sameSite`: `'strict'` em produção, `'lax'` em desenvolvimento.
 * - `httpOnly`: sempre habilitado (inacessível via JavaScript no cliente).
 *
 * @param params - Parâmetros para geração dos tokens.
 * @param params.reply - Objeto reply do Fastify para assinar tokens e configurar cookies.
 * @param params.id - Identificador público do usuário (campo `sub` do JWT).
 * @param params.payload - Dados adicionais a serem incluídos no payload do JWT.
 * @returns Objeto contendo `accessToken` e `reply` (com cookie já configurado).
 */
export async function buildAuthTokens({ reply, id, payload }: BuildAuthTokensParams): Promise<AuthTokensResult> {
  const accessToken = await reply.jwtSign(payload, {
    sub: id,
    expiresIn: env.JWT_EXPIRATION,
  })

  const refreshToken = await reply.jwtSign(payload, {
    sub: id,
    expiresIn: env.JWT_REFRESH_EXPIRATION,
  })

  const replyWithCookie = reply.setCookie('refreshToken', refreshToken, {
    path: '/',
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
    httpOnly: true,
  })

  return {
    accessToken,
    reply: replyWithCookie,
  }
}
