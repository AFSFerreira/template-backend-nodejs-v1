import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { AuthenticateType } from '@custom-types/entrypoints/http/schemas/user/authenticate-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { authenticateConnectionInfoSchema } from '@http/schemas/user/authenticate-connection-info-schema'
import { AuthenticateUseCase } from '@use-cases/user/authenticate'
import { buildAuthTokens } from '@utils/http/build-auth-tokens'
import { getConnectionInfo } from '@utils/http/get-connection-info'
import { inject, singleton } from 'tsyringe'

@singleton()
export class AuthenticateController implements IController {
  constructor(
    @inject(AuthenticateUseCase)
    private readonly useCase: AuthenticateUseCase,

    @inject(UserDefaultPresenter)
    private readonly userDefaultPresenter: UserDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: AuthenticateType }>, reply: FastifyReply) {
    const { login, password } = request.body

    const { ipAddress, browser, remotePort } = authenticateConnectionInfoSchema.parse(getConnectionInfo(request))
    const { user } = await this.useCase.execute({
      login,
      password,
      ipAddress,
      browser,
      remotePort,
    })

    const { accessToken, reply: replyWithCookie } = await buildAuthTokens({
      reply,
      id: user.id,
      payload: {
        role: user.role,
      },
    })

    const formattedUser = this.userDefaultPresenter.toHTTP(user)

    const formattedReply = {
      accessToken,
      user: formattedUser,
    }

    return await replyWithCookie.sendResponse(formattedReply)
  }
}
