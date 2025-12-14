import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteBlogImageParamsSchema } from '@schemas/blog/delete-blog-image-params-schema'
import { DeleteBlogImageUseCase } from '@use-cases/blogs/delete-blog-image'
import { container } from 'tsyringe'

export async function deleteBlogImage(request: FastifyRequest, reply: FastifyReply) {
  const { fileName } = deleteBlogImageParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteBlogImageUseCase)

  await useCase.execute({ fileName })

  return await reply.status(204).send()
}
