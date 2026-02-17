import type { AuthTokensResult } from '@custom-types/services/http/auth-tokens-result'
import type { BuildAuthTokensParams } from '@custom-types/services/http/build-auth-tokens-params'
import { env } from '@env/index'

export async function buildAuthTokens({ reply, publicId, payload }: BuildAuthTokensParams): Promise<AuthTokensResult> {
  const accessToken = await reply.jwtSign(payload, {
    sign: {
      sub: publicId,
      expiresIn: env.JWT_EXPIRATION,
    },
  })

  const refreshToken = await reply.jwtSign(payload, {
    sign: {
      sub: publicId,
      expiresIn: env.JWT_REFRESH_EXPIRATION,
    },
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
