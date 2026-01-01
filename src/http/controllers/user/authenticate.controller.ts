import type { HTTPUser } from '@custom-types/presenter/user/user-default'
import type { User } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '@env/index'
import { UserPresenter } from '@presenters/variants/user-presenter'
import { authenticateBodySchema } from '@schemas/user/authenticate-body-schema'
import { AuthenticateUseCase } from '@use-cases/user/authenticate'
import { container } from 'tsyringe'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const { login, password } = authenticateBodySchema.parse(request.body)
  const { ip: ipAddress } = request
  const { 'user-agent': browser } = request.headers
  const { remotePort } = request.socket
  const browserName = Array.isArray(browser) ? browser[0] : browser

  const useCase = container.resolve(AuthenticateUseCase)

  const { user } = await useCase.execute({
    login,
    password,
    ipAddress,
    browser: browserName,
    remotePort: `${remotePort}`,
  })

  const tokenPayload = {
    role: user.role,
    status: user.membershipStatus,
  }

  const accessToken = await reply.jwtSign(tokenPayload, {
    sign: {
      sub: user.publicId,
      expiresIn: env.JWT_EXPIRATION,
    },
  })

  const refreshToken = await reply.jwtSign(tokenPayload, {
    sign: {
      sub: user.publicId,
      expiresIn: env.JWT_REFRESH_EXPIRATION,
    },
  })

  const formattedUser = UserPresenter.toHTTP<User, HTTPUser>(user)

  return await reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
      httpOnly: true,
    })
    .status(200)
    .send({
      data: {
        accessToken,
        user: formattedUser,
      },
    })
}
