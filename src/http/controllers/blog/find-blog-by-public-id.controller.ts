import { BLOG_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { BlogPresenter } from '@presenters/blog-presenter'
import { findBlogByPublicIdParamsSchema } from '@schemas/blog/find-blog-by-public-id-query-schema'
import { makeFindBlogByPublicIdUseCase } from '@use-cases/factories/blog/make-find-blog-by-public-id-use-case'
import { getClientIp } from '@utils/http/get-client-ip'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function findBlogByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const parsedParams = findBlogByPublicIdParamsSchema.parse(request.params)

  const useCase = makeFindBlogByPublicIdUseCase()

  const ip = getClientIp(request)

  const { blog } = await useCase.execute({ publicId: parsedParams.publicId, ip })

  return await reply.status(200).send({ data: BlogPresenter.toHTTP(blog, BLOG_DETAILED_PRESENTER_KEY) })
}
