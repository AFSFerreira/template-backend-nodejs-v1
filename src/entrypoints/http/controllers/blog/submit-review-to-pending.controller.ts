import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { SubmitReviewToPendingParamsType } from '@custom-types/http/schemas/blog/submit-review-to-pending-params-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { SubmitReviewToPendingUseCase } from '@use-cases/blog/submit-review-to-pending'
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

  return await reply.status(200).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
