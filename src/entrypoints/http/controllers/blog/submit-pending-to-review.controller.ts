import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { SubmitPendingToReviewParamsType } from '@custom-types/http/schemas/blog/submit-pending-to-review-params-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { SubmitPendingToReviewUseCase } from '@use-cases/blog/submit-pending-to-review'
import { StatusCodes } from 'http-status-codes'
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

  return await reply.status(StatusCodes.OK).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
