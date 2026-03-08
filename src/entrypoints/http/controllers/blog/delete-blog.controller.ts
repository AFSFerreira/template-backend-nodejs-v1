import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteBlogParamsType } from '@custom-types/http/schemas/blog/delete-blog-params-schema'
import type { FastifyReply } from 'fastify'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { DeleteBlogUseCase } from '@use-cases/blog/delete-blog'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function deleteBlog(request: ZodRequest<{ params: DeleteBlogParamsType }>, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const { publicId } = request.params

  const useCase = container.resolve(DeleteBlogUseCase)

  await useCase.execute({ publicId, userPublicId })

  return await reply.status(StatusCodes.NO_CONTENT).send()
}
