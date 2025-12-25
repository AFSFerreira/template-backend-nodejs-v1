import type { HTTPBlog } from '@custom-types/presenter/blog/blog-default'
import type { Blog } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlogPresenter } from '@presenters/variants/blog-presenter'
import { createBlogBodySchema } from '@schemas/blog/create-blog-body-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { CreateDraftBlogUseCase } from '@use-cases/blogs/create-draft-blog'
import { container } from 'tsyringe'

export async function createDraftBlog(request: FastifyRequest, reply: FastifyReply) {
  const authorPublicId = getRequestUserPublicId(request)
  const parsedBody = createBlogBodySchema.parse(request.body)

  const useCase = container.resolve(CreateDraftBlogUseCase)

  const { blog } = await useCase.execute({
    ...parsedBody,
    authorPublicId,
  })

  return await reply.status(201).send({
    data: BlogPresenter.toHTTP<Blog, HTTPBlog>(blog),
  })
}
