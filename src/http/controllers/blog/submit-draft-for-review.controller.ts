import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import { BlogPresenter } from '@presenters/blog-presenter'
import { submitDraftForReviewParamsSchema } from '@schemas/blog/submit-draft-for-review-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { SubmitDraftForReviewUseCase } from '@use-cases/blog/submit-draft-for-review'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function submitDraftForReview(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = submitDraftForReviewParamsSchema.parse(request.params)

  const useCase = container.resolve(SubmitDraftForReviewUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  return await reply.status(200).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
