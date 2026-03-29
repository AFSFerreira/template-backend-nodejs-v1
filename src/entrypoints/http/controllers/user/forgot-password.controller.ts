import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ForgotPasswordBodyType } from '@custom-types/entrypoints/http/schemas/user/forgot-password-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { PASSWORD_RESET_IF_USER_EXISTS } from '@messages/responses/user-responses/2xx'
import { ForgotPasswordUseCase } from '@use-cases/user/forgot-password'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ForgotPasswordController implements IController {
  constructor(
    @inject(ForgotPasswordUseCase)
    private readonly useCase: ForgotPasswordUseCase,
  ) {}

  async handle(request: ZodRequest<{ body: ForgotPasswordBodyType }>, reply: FastifyReply) {
    const { login } = request.body
    await this.useCase.execute({ login })

    return await reply.sendApiResponse(PASSWORD_RESET_IF_USER_EXISTS)
  }
}
