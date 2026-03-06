import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { UpdateBlogBodyType } from '@custom-types/http/schemas/blog/update-blog-body-schema'
import type { UpdateBlogParamsType } from '@custom-types/http/schemas/blog/update-blog-params-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { UpdateBlogUseCase } from '@use-cases/blog/update-blog'
import { container } from 'tsyringe'

export async function updateBlog(
  request: ZodRequest<{ body: UpdateBlogBodyType; params: UpdateBlogParamsType }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const { publicId } = request.params
  const parsedBody = request.body

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
