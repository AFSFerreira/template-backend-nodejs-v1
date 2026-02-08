import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import { BlogPresenter } from '@presenters/blog-presenter'
import { createBlogBodySchema } from '@schemas/blog/create-blog-body-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { CreatePendingBlogUseCase } from '@use-cases/blog/create-pending-blog'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function createPendingBlog(request: FastifyRequest, reply: FastifyReply) {
  const authorPublicId = getRequestUserPublicId(request)
  const parsedBody = createBlogBodySchema.parse(request.body)

  const useCase = container.resolve(CreatePendingBlogUseCase)

  const { blog } = await useCase.execute({
    ...parsedBody,
    authorPublicId,
  })

  return await reply.status(201).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
