import type { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '@/env'
import { UserPresenter } from '@/presenters/user-presenter'
import { authenticateBodySchema } from '@/schemas/user/authenticate-schema'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/user/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { emailOrUsername, password } = authenticateBodySchema.parse(
    request.body,
  )
  const { ip: ipAddress } = request
  const { 'user-agent': browser } = request.headers
  const { remotePort } = request.socket
  const browserName = Array.isArray(browser) ? browser[0] : browser

  const authenticateUseCase = makeAuthenticateUseCase()

  try {
    const { user } = await authenticateUseCase.execute({
      emailOrUsername,
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
          expiresIn: '7d',
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
  } catch (error: unknown) {
    if (error instanceof InvalidCredentialsError) {
      return await reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
