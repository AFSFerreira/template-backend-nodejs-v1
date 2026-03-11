import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RequestEmailChangeBodyType } from '@custom-types/http/schemas/user/request-email-change-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { EMAIL_CHANGE_REQUESTED } from '@messages/responses/user-responses/2xx'
import { RequestEmailChangeUseCase } from '@use-cases/user/request-email-change'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RequestEmailChangeController implements IController {
  constructor(
    @inject(RequestEmailChangeUseCase)
    private readonly useCase: RequestEmailChangeUseCase,
  ) {}

  async handle(request: ZodRequest<{ body: RequestEmailChangeBodyType }>, reply: FastifyReply) {
    await this.useCase.execute({
      ...request.body,
      userPublicId: getRequestUserPublicId(request),
    })

    return await reply.sendApiResponse(EMAIL_CHANGE_REQUESTED)
  }
}
