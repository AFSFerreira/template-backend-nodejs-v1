import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { SubmitPublishedToReviewParamsType } from '@custom-types/http/schemas/blog/submit-published-to-review-params-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { SubmitPublishedToPendingUseCase } from '@use-cases/blog/submit-published-to-pending'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { container } from 'tsyringe'

export async function submitPublishedToPending(
  request: ZodRequest<{ params: SubmitPublishedToReviewParamsType }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = request.params

  const useCase = container.resolve(SubmitPublishedToPendingUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  const formattedReply = BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog)

  return await reply.sendResponse(formattedReply)
}
