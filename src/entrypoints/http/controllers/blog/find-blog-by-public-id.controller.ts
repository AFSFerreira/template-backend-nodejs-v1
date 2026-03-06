import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDetailedPresenterInput, HTTPBlogDetailed } from '@custom-types/http/presenter/blog/blog-detailed'
import type { FindBlogByPublicIdParamsType } from '@custom-types/http/schemas/blog/find-blog-by-public-id-query-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FindBlogByPublicIdUseCase } from '@use-cases/blog/find-blog-by-public-id'
import { getClientIp } from '@utils/http/get-client-ip'
import { container } from 'tsyringe'

export async function findBlogByPublicId(
  request: ZodRequest<{ params: FindBlogByPublicIdParamsType }>,
  reply: FastifyReply,
) {
  const parsedParams = request.params

  const useCase = container.resolve(FindBlogByPublicIdUseCase)

  const ip = getClientIp(request)

  const { blog } = await useCase.execute({ publicId: parsedParams.publicId, ip })

  const formattedReply = BlogPresenter.toHTTP<BlogDetailedPresenterInput, HTTPBlogDetailed>(
    blog,
    tsyringeTokens.presenters.blog.blogDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
