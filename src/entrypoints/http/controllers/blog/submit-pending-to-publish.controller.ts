import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { SubmitReviewToPublishParamsType } from '@custom-types/http/schemas/blog/submit-review-to-publish-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { SubmitPendingToPublishUseCase } from '@use-cases/blog/submit-pending-to-publish'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class SubmitPendingToPublishController implements IController {
  constructor(
    @inject(SubmitPendingToPublishUseCase)
    private readonly useCase: SubmitPendingToPublishUseCase,

    @inject(BlogDefaultPresenter)
    private readonly blogDefaultPresenter: BlogDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: SubmitReviewToPublishParamsType }>, reply: FastifyReply) {
    const { blog } = await this.useCase.execute({
      ...request.params,
      userPublicId: getRequestUserPublicId(request),
    })

    const formattedReply = this.blogDefaultPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply)
  }
}
