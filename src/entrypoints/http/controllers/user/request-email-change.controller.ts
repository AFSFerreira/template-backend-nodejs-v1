import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RequestEmailChangeBodyType } from '@custom-types/http/schemas/user/request-email-change-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { RequestEmailChangeUseCase } from '@use-cases/user/request-email-change'
import type { FastifyReply } from 'fastify'
import { EMAIL_CHANGE_REQUESTED } from '@messages/responses/user-responses/2xx'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class RequestEmailChangeController implements IController {
  constructor(private useCase: RequestEmailChangeUseCase) {}

  async handle(request: ZodRequest<{ body: RequestEmailChangeBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body
    const userPublicId = getRequestUserPublicId(request)
    await this.useCase.execute({
      ...parsedBody,
      userPublicId,
    })

    return await reply.sendApiResponse(EMAIL_CHANGE_REQUESTED)
  }
}
