import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdatePasswordBodyType } from '@custom-types/entrypoints/http/schemas/user/update-password-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { PASSWORD_UPDATED_SUCCESSFULLY } from '@messages/responses/user-responses/2xx'
import { ChangePasswordUseCase } from '@use-cases/user/change-password'
import { getRequestUserId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ChangePasswordController implements IController {
  constructor(
    @inject(ChangePasswordUseCase)
    private readonly useCase: ChangePasswordUseCase,
  ) {}

  async handle(request: ZodRequest<{ body: UpdatePasswordBodyType }>, reply: FastifyReply) {
    await this.useCase.execute({
      ...request.body,
      userId: getRequestUserId(request),
    })

    return await reply.sendApiResponse(PASSWORD_UPDATED_SUCCESSFULLY)
  }
}
