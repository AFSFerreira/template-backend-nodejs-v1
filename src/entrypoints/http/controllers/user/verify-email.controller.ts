import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { VerifyEmailBodyType } from '@custom-types/http/schemas/user/verify-email-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { EMAIL_VERIFICATION_SUCCESSFUL } from '@messages/responses/user-responses/2xx'
import { VerifyEmailUseCase } from '@use-cases/user/verify-email'
import { inject, injectable } from 'tsyringe'

@injectable()
export class VerifyEmailController implements IController {
  constructor(
    @inject(VerifyEmailUseCase)
    private readonly useCase: VerifyEmailUseCase,
  ) {}

  async handle(request: ZodRequest<{ body: VerifyEmailBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body
    await this.useCase.execute(parsedBody)

    return await reply.sendApiResponse(EMAIL_VERIFICATION_SUCCESSFUL)
  }
}
