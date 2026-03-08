import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  BlogDetailedForAdminPresenterInput,
  HTTPBlogDetailedForAdmin,
} from '@custom-types/http/presenter/blog/blog-detailed-for-admin'
import type { GetAllUserBlogsDetailedQueryType } from '@custom-types/http/schemas/blog/get-all-user-blogs-detailed-query-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { GetAllUserBlogsDetailedUseCase } from '@use-cases/blog/get-all-user-blogs-detailed'
import { container } from 'tsyringe'

export async function getAllUserBlogsDetailed(
  request: ZodRequest<{ querystring: GetAllUserBlogsDetailedQueryType }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllUserBlogsDetailedUseCase)

  const { data, meta } = await useCase.execute({
    ...parsedQuery,
    userPublicId,
  })

  const formattedReply = BlogPresenter.toHTTP<BlogDetailedForAdminPresenterInput, HTTPBlogDetailedForAdmin>(
    data,
    tsyringeTokens.presenters.blog.blogDetailedForAdmin,
  )

  return await reply.sendPaginated(formattedReply, meta)
}
