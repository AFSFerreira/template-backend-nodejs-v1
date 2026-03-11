import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { SubmitReviewToPendingParamsType } from '@custom-types/http/schemas/blog/submit-review-to-pending-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { SubmitReviewToPendingUseCase } from '@use-cases/blog/submit-review-to-pending'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class SubmitReviewToPendingController implements IController {
  constructor(
    @inject(SubmitReviewToPendingUseCase)
    private readonly useCase: SubmitReviewToPendingUseCase,

    @inject(BlogDefaultPresenter)
    private readonly blogDefaultPresenter: BlogDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: SubmitReviewToPendingParamsType }>, reply: FastifyReply) {
    const { blog } = await this.useCase.execute({
      ...request.params,
      userPublicId: getRequestUserPublicId(request),
    })

    const formattedReply = this.blogDefaultPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply)
  }
}
