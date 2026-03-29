import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ResetPasswordBodyType } from '@custom-types/entrypoints/http/schemas/user/reset-password-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { PASSWORD_RESET_SUCCESSFUL } from '@messages/responses/user-responses/2xx'
import { ResetPasswordUseCase } from '@use-cases/user/reset-password'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ResetPasswordController implements IController {
  constructor(
    @inject(ResetPasswordUseCase)
    private readonly useCase: ResetPasswordUseCase,
  ) {}

  async handle(request: ZodRequest<{ body: ResetPasswordBodyType }>, reply: FastifyReply) {
    const { newPassword, token } = request.body
    await this.useCase.execute({
      newPassword,
      token,
    })

    return await reply.sendApiResponse(PASSWORD_RESET_SUCCESSFUL)
  }
}
