import type { HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { Blog } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlogPresenter } from '@presenters/blog-presenter'
import { submitPendingToReviewParamsSchema } from '@schemas/blog/submit-pending-to-review-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { SubmitPendingToReviewUseCase } from '@use-cases/blogs/submit-pending-to-review'
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
    data: BlogPresenter.toHTTP<Blog, HTTPBlog>(blog),
  })
}
