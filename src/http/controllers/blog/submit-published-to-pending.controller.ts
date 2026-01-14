import type { HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { Blog } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlogPresenter } from '@presenters/blog-presenter'
import { submitPublishedToPendingParamsSchema } from '@schemas/blog/submit-published-to-review-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { SubmitPublishedToPendingUseCase } from '@use-cases/blogs/submit-published-to-pending'
import { container } from 'tsyringe'

export async function submitPublishedToPending(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = submitPublishedToPendingParamsSchema.parse(request.params)

  const useCase = container.resolve(SubmitPublishedToPendingUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  return await reply.status(200).send({
    data: BlogPresenter.toHTTP<Blog, HTTPBlog>(blog),
  })
}
