import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { HTTPUser, UserDefaultPresenterInput } from '@custom-types/http/presenter/user/user-default'
import type { AuthenticateType } from '@custom-types/http/schemas/user/authenticate-body-schema'
import type { FastifyReply } from 'fastify'
import { UserPresenter } from '@http/presenters/user-presenter'
import { authenticateConnectionInfoSchema } from '@http/schemas/user/authenticate-connection-info-schema'
import { AuthenticateUseCase } from '@use-cases/user/authenticate'
import { buildAuthTokens } from '@utils/http/build-auth-tokens'
import { getConnectionInfo } from '@utils/http/get-connection-info'
import { container } from 'tsyringe'

export async function authenticate(request: ZodRequest<{ body: AuthenticateType }>, reply: FastifyReply) {
  const { login, password } = request.body

  const info = getConnectionInfo(request)

  const { ipAddress, browser, remotePort } = authenticateConnectionInfoSchema.parse(info)

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

  const formattedReply = {
    accessToken,
    user: formattedUser,
  }

  return await replyWithCookie.sendResponse(formattedReply)
}
