import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  BlogDetailedForAdminPresenterInput,
  HTTPBlogDetailedForAdmin,
} from '@custom-types/http/presenter/blog/blog-detailed-for-admin'
import type { GetAllBlogsDetailedQueryType } from '@custom-types/http/schemas/blog/get-all-blogs-detailed-query-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllBlogsDetailedUseCase } from '@use-cases/blog/get-all-blogs-detailed'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { container } from 'tsyringe'

export async function getAllBlogsDetailed(
  request: ZodRequest<{
    querystring: GetAllBlogsDetailedQueryType
  }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const query = request.query

  const useCase = container.resolve(GetAllBlogsDetailedUseCase)

  const { data, meta } = await useCase.execute({
    ...query,
    userPublicId,
  })

  const formattedReply = BlogPresenter.toHTTP<BlogDetailedForAdminPresenterInput, HTTPBlogDetailedForAdmin>(
    data,
    tsyringeTokens.presenters.blog.blogDetailedForAdmin,
  )

  return await reply.sendPaginated(formattedReply, meta)
}
