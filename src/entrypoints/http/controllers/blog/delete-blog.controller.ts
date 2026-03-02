import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteBlogParamsSchema } from '@schemas/blog/delete-blog-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { DeleteBlogUseCase } from '@use-cases/blog/delete-blog'
import { container } from 'tsyringe'

export async function deleteBlog(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const { publicId } = deleteBlogParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteBlogUseCase)

  await useCase.execute({ publicId, userPublicId })

  return await reply.status(204).send()
}
