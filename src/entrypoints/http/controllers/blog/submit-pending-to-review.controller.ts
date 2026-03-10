import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { SubmitPendingToReviewParamsType } from '@custom-types/http/schemas/blog/submit-pending-to-review-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { SubmitPendingToReviewUseCase } from '@use-cases/blog/submit-pending-to-review'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class SubmitPendingToReviewController implements IController {
  constructor(private useCase: SubmitPendingToReviewUseCase) {}

  async handle(request: ZodRequest<{ params: SubmitPendingToReviewParamsType }>, reply: FastifyReply) {
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
