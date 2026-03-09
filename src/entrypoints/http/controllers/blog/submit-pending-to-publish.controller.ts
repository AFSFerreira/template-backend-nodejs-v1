import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { SubmitReviewToPublishParamsType } from '@custom-types/http/schemas/blog/submit-review-to-publish-params-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { SubmitPendingToPublishUseCase } from '@use-cases/blog/submit-pending-to-publish'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { container } from 'tsyringe'

export async function submitPendingToPublish(
  request: ZodRequest<{ params: SubmitReviewToPublishParamsType }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = request.params

  const useCase = container.resolve(SubmitPendingToPublishUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  const formattedReply = BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog)

  return await reply.sendResponse(formattedReply)
}
