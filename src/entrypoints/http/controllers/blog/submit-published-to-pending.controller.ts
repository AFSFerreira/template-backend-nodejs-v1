import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { SubmitPublishedToReviewParamsType } from '@custom-types/http/schemas/blog/submit-published-to-review-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { SubmitPublishedToPendingUseCase } from '@use-cases/blog/submit-published-to-pending'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class SubmitPublishedToPendingController implements IController {
  constructor(
    @inject(SubmitPublishedToPendingUseCase)
    private readonly useCase: SubmitPublishedToPendingUseCase,

    @inject(BlogDefaultPresenter)
    private readonly blogDefaultPresenter: BlogDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: SubmitPublishedToReviewParamsType }>, reply: FastifyReply) {
    const { blog } = await this.useCase.execute({
      ...request.params,
      userPublicId: getRequestUserPublicId(request),
    })

    const formattedReply = this.blogDefaultPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply)
  }
}
