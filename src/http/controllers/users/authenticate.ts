import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { env } from '../../../env'
import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '../../../use-cases/user/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    emailOrUsername: z.union([z.string().email(), z.string().min(4)]),
    password: z.string().min(6),
  })

  const { emailOrUsername, password } = authenticateBodySchema.parse(
    request.body,
  )
  const { ip: ipAddress } = request
  const { 'user-agent': browser } = request.headers
  const { remotePort } = request.socket

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const browserName = Array.isArray(browser) ? browser[0] : browser

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
          sub: user?.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user?.id,
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
      .send({ user, accessToken })
  } catch (err: unknown) {
    if (err instanceof InvalidCredentialsError) {
      return await reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
