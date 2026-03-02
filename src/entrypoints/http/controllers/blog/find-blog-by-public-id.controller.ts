import type { BlogDetailedPresenterInput, HTTPBlogDetailed } from '@custom-types/http/presenter/blog/blog-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BlogPresenter } from '@presenters/blog-presenter'
import { findBlogByPublicIdParamsSchema } from '@schemas/blog/find-blog-by-public-id-query-schema'
import { FindBlogByPublicIdUseCase } from '@use-cases/blog/find-blog-by-public-id'
import { getClientIp } from '@utils/http/get-client-ip'
import { container } from 'tsyringe'

export async function findBlogByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const parsedParams = findBlogByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(FindBlogByPublicIdUseCase)

  const ip = getClientIp(request)

  const { blog } = await useCase.execute({ publicId: parsedParams.publicId, ip })

  const formattedReply = BlogPresenter.toHTTP<BlogDetailedPresenterInput, HTTPBlogDetailed>(
    blog,
    tsyringeTokens.presenters.blog.blogDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
