import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlogPresenter } from '@presenters/blog-presenter'
import { updateBlogBodySchema } from '@schemas/blog/update-blog-body-schema'
import { updateBlogParamsSchema } from '@schemas/blog/update-blog-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { UpdateBlogUseCase } from '@use-cases/blogs/update-blog'
import { container } from 'tsyringe'

export async function updateBlog(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const { publicId } = updateBlogParamsSchema.parse(request.params)
  const parsedBody = updateBlogBodySchema.parse(request.body)

  const useCase = container.resolve(UpdateBlogUseCase)

  const { blog } = await useCase.execute({
    publicId,
    body: parsedBody,
    userPublicId,
  })

  return await reply.status(200).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
