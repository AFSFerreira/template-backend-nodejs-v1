import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { SubmitDraftForReviewParamsType } from '@custom-types/http/schemas/blog/submit-draft-for-review-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { SubmitDraftForReviewUseCase } from '@use-cases/blog/submit-draft-for-review'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class SubmitDraftForReviewController implements IController {
  constructor(private useCase: SubmitDraftForReviewUseCase) {}

  async handle(request: ZodRequest<{ params: SubmitDraftForReviewParamsType }>, reply: FastifyReply) {
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
