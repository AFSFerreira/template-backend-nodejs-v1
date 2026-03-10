import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { SubmitPublishedToReviewParamsType } from '@custom-types/http/schemas/blog/submit-published-to-review-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { SubmitPublishedToPendingUseCase } from '@use-cases/blog/submit-published-to-pending'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class SubmitPublishedToPendingController implements IController {
  constructor(private useCase: SubmitPublishedToPendingUseCase) {}

  async handle(request: ZodRequest<{ params: SubmitPublishedToReviewParamsType }>, reply: FastifyReply) {
    const userPublicId = getRequestUserPublicId(request)
    const parsedParams = request.params
    const { blog } = await this.useCase.execute({
      ...parsedParams,
      userPublicId,
    })

    const formattedReply = BlogDefaultPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply)
  }
}
