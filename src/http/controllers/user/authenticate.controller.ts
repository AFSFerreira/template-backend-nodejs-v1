import type { HTTPUser, UserDefaultPresenterInput } from '@custom-types/http/presenter/user/user-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@presenters/user-presenter'
import { authenticateBodySchema } from '@schemas/user/authenticate-body-schema'
import { authenticateConnectionInfoSchema } from '@schemas/user/authenticate-connection-info-schema'
import { buildAuthTokens } from '@services/http/build-auth-tokens'
import { AuthenticateUseCase } from '@use-cases/user/authenticate'
import { getConnectionInfo } from '@utils/http/get-connection-info'
import { container } from 'tsyringe'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const { login, password } = authenticateBodySchema.parse(request.body)

  const { ipAddress, browser, remotePort } = authenticateConnectionInfoSchema.parse(getConnectionInfo(request))

  const useCase = container.resolve(AuthenticateUseCase)

  const { user } = await useCase.execute({
    login,
    password,
    ipAddress,
    browser,
    remotePort,
  })

  const { accessToken, reply: replyWithCookie } = await buildAuthTokens({
    reply,
    publicId: user.publicId,
    payload: {
      role: user.role,
      status: user.membershipStatus,
    },
  })

  const formattedUser = UserPresenter.toHTTP<UserDefaultPresenterInput, HTTPUser>(user)

  return await replyWithCookie.status(200).send({
    data: {
      accessToken,
      user: formattedUser,
    },
  })
}
