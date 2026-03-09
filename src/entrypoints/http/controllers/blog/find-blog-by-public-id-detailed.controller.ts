import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  BlogDetailedWithContentPresenterInput,
  HTTPBlogDetailedWithContent,
} from '@custom-types/http/presenter/blog/blog-detailed-with-content'
import type { FindBlogByPublicIdParamsType } from '@custom-types/http/schemas/blog/find-blog-by-public-id-query-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FindBlogByPublicIdRestrictedUseCase } from '@use-cases/blog/find-blog-by-public-id-detailed'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { container } from 'tsyringe'

export async function findBlogByPublicIdRestricted(
  request: ZodRequest<{ params: FindBlogByPublicIdParamsType }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const { publicId } = request.params

  const useCase = container.resolve(FindBlogByPublicIdRestrictedUseCase)

  const { blog } = await useCase.execute({ publicId, userPublicId })

  const formattedReply = BlogPresenter.toHTTP<BlogDetailedWithContentPresenterInput, HTTPBlogDetailedWithContent>(
    blog,
    tsyringeTokens.presenters.blog.blogDetailedWithContent,
  )

  return await reply.sendResponse(formattedReply)
}
