import type { HTTPBlog } from '@custom-types/presenter/blog/blog-default'
import type { Blog } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlogPresenter } from '@presenters/variants/blog-presenter'
import { createDraftCopyBlogParamsSchema } from '@schemas/blog/create-draft-copy-blog-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { CreateDraftCopyBlogUseCase } from '@use-cases/blogs/create-draft-copy-blog'
import { container } from 'tsyringe'

export async function createDraftCopyBlog(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = createDraftCopyBlogParamsSchema.parse(request.params)

  const useCase = container.resolve(CreateDraftCopyBlogUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  return await reply.status(201).send({
    data: BlogPresenter.toHTTP<Blog, HTTPBlog>(blog),
  })
}
