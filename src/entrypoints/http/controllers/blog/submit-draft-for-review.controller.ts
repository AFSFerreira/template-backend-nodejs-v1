import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { SubmitDraftForReviewParamsType } from '@custom-types/http/schemas/blog/submit-draft-for-review-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { SubmitDraftForReviewUseCase } from '@use-cases/blog/submit-draft-for-review'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class SubmitDraftForReviewController implements IController {
  constructor(
    @inject(SubmitDraftForReviewUseCase)
    private readonly useCase: SubmitDraftForReviewUseCase,

    @inject(BlogDefaultPresenter)
    private readonly blogDefaultPresenter: BlogDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: SubmitDraftForReviewParamsType }>, reply: FastifyReply) {
    const { blog } = await this.useCase.execute({
      ...request.params,
      userPublicId: getRequestUserPublicId(request),
    })

    const formattedReply = this.blogDefaultPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply)
  }
}
