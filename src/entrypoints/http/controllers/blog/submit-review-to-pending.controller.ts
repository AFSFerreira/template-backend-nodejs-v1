import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { SubmitReviewToPendingParamsType } from '@custom-types/http/schemas/blog/submit-review-to-pending-params-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { SubmitReviewToPendingUseCase } from '@use-cases/blog/submit-review-to-pending'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { container } from 'tsyringe'

export async function submitReviewToPending(
  request: ZodRequest<{ params: SubmitReviewToPendingParamsType }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = request.params

  const useCase = container.resolve(SubmitReviewToPendingUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  const formattedReply = BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog)

  return await reply.sendResponse(formattedReply)
}
