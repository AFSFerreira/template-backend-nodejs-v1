import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { SubmitPendingToReviewParamsType } from '@custom-types/http/schemas/blog/submit-pending-to-review-params-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { SubmitPendingToReviewUseCase } from '@use-cases/blog/submit-pending-to-review'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { container } from 'tsyringe'

export async function submitPendingToReview(
  request: ZodRequest<{ params: SubmitPendingToReviewParamsType }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = request.params

  const useCase = container.resolve(SubmitPendingToReviewUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  const formattedReply = BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog)

  return await reply.sendResponse(formattedReply)
}
