import { BlogPresenter } from '@presenters/blog-presenter'
import { findBlogByPublicIdParamsSchema } from '@schemas/blog/find-blog-by-public-id-query-schema'
import { makeFindBlogByPublicIdUseCase } from '@use-cases/factories/blog/make-find-blog-by-public-id-use-case'
import { getClientIp } from '@utils/get-client-ip'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function findBlogByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = findBlogByPublicIdParamsSchema.parse(request.params)
  const findBlogByPublicIdUseCase = makeFindBlogByPublicIdUseCase()

  const ip = getClientIp(request)

  const { blog } = await findBlogByPublicIdUseCase.execute({ publicId: parsedQuery.publicId, ip })

  return await reply.status(200).send({ data: BlogPresenter.toHTTP(blog) })
}
