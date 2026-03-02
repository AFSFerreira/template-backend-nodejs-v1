import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { submitPendingToReviewParamsSchema } from '@http/schemas/blog/submit-pending-to-review-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { SubmitPendingToReviewUseCase } from '@use-cases/blog/submit-pending-to-review'
import { container } from 'tsyringe'

export async function submitPendingToReview(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = submitPendingToReviewParamsSchema.parse(request.params)

  const useCase = container.resolve(SubmitPendingToReviewUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  return await reply.status(200).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
