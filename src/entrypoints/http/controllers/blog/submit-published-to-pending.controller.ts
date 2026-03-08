import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { SubmitPublishedToReviewParamsType } from '@custom-types/http/schemas/blog/submit-published-to-review-params-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { SubmitPublishedToPendingUseCase } from '@use-cases/blog/submit-published-to-pending'
import { StatusCodes } from 'http-status-codes'
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

  return await reply.status(StatusCodes.OK).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
