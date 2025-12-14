import type { HTTPBlog } from '@custom-types/presenter/blog/blog-default'
import type { Blog } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlogPresenter } from '@presenters/variants/blog-presenter'
import { createBlogBodySchema } from '@schemas/blog/create-blog-body-schema'
import { getRequestUserId } from '@services/http/get-request-user-id'
import { CreateBlogUseCase } from '@use-cases/blogs/create-blog'
import { container } from 'tsyringe'

export async function createBlog(request: FastifyRequest, reply: FastifyReply) {
  const authorPublicId = getRequestUserId(request)
  const parsedBody = createBlogBodySchema.parse(request.body)

  const useCase = container.resolve(CreateBlogUseCase)

  const { blog } = await useCase.execute({
    ...parsedBody,
    authorPublicId,
  })

  return await reply.status(201).send({
    data: BlogPresenter.toHTTP<Blog, HTTPBlog>(blog),
  })
}
