import type { HTTPBlog } from '@custom-types/presenter/blog/blog-default'
import type { Blog } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlogPresenter } from '@presenters/blog-presenter'
import { submitPendingToPublishParamsSchema } from '@schemas/blog/submit-review-to-publish-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { SubmitPendingToPublishUseCase } from '@use-cases/blogs/submit-pending-to-publish'
import { container } from 'tsyringe'

export async function submitPendingToPublish(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = submitPendingToPublishParamsSchema.parse(request.params)

  const useCase = container.resolve(SubmitPendingToPublishUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  return await reply.status(200).send({
    data: BlogPresenter.toHTTP<Blog, HTTPBlog>(blog),
  })
}
