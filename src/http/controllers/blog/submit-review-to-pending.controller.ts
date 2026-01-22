import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlogPresenter } from '@presenters/blog-presenter'
import { submitReviewToPendingParamsSchema } from '@schemas/blog/submit-review-to-pending-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { SubmitReviewToPendingUseCase } from '@use-cases/blogs/submit-review-to-pending'
import { container } from 'tsyringe'

export async function submitReviewToPending(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = submitReviewToPendingParamsSchema.parse(request.params)

  const useCase = container.resolve(SubmitReviewToPendingUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  return await reply.status(200).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
