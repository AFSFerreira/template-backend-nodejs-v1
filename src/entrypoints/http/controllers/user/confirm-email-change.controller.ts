import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ConfirmEmailChangeBodyType } from '@custom-types/http/schemas/user/confirm-email-change-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { EMAIL_UPDATED_SUCCESSFULLY } from '@messages/responses/user-responses/2xx'
import { ConfirmEmailChangeUseCase } from '@use-cases/user/confirm-email-change'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ConfirmEmailChangeController implements IController {
  constructor(
    @inject(ConfirmEmailChangeUseCase)
    private readonly useCase: ConfirmEmailChangeUseCase,
  ) {}

  async handle(request: ZodRequest<{ body: ConfirmEmailChangeBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body
    await this.useCase.execute(parsedBody)

    return await reply.sendApiResponse(EMAIL_UPDATED_SUCCESSFULLY)
  }
}
