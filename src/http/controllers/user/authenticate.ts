import { env } from '@env/index'
import { UserPresenter } from '@presenters/user-presenter'
import { authenticateBodySchema } from '@schemas/user/authenticate-body-schema'
import { InvalidCredentialsError } from '@use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@use-cases/factories/user/make-authenticate-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { login, password } = authenticateBodySchema.parse(request.body)
  const { ip: ipAddress } = request
  const { 'user-agent': browser } = request.headers
  const { remotePort } = request.socket
  const browserName = Array.isArray(browser) ? browser[0] : browser

  const authenticateUseCase = makeAuthenticateUseCase()

  try {
    const { user } = await authenticateUseCase.execute({
      login,
      password,
      ipAddress,
      browser: browserName,
      remotePort: `${remotePort}`,
    })

    const accessToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user?.publicId,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user?.publicId,
          expiresIn: env.JWT_REFRESH_EXPIRATION,
        },
      },
    )

    return await reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
        httpOnly: true,
      })
      .status(200)
      .send({ accessToken, user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return await reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
