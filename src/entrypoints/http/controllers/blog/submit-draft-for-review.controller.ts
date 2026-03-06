import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { SubmitDraftForReviewParamsType } from '@custom-types/http/schemas/blog/submit-draft-for-review-params-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { SubmitDraftForReviewUseCase } from '@use-cases/blog/submit-draft-for-review'
import { container } from 'tsyringe'

export async function submitDraftForReview(
  request: ZodRequest<{ params: SubmitDraftForReviewParamsType }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = request.params

  const useCase = container.resolve(SubmitDraftForReviewUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  return await reply.status(200).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
