import type {
  BlogDetailedForAdminPresenterInput,
  HTTPBlogDetailedForAdmin,
} from '@custom-types/http/presenter/blog/blog-detailed-for-admin'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BlogPresenter } from '@presenters/blog-presenter'
import { getAllUserBlogsDetailedQuerySchema } from '@schemas/blog/get-all-user-blogs-detailed-query-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { GetAllUserBlogsDetailedUseCase } from '@use-cases/blogs/get-all-user-blogs-detailed'
import { container } from 'tsyringe'

export async function getAllUserBlogsDetailed(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedQuery = getAllUserBlogsDetailedQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllUserBlogsDetailedUseCase)

  const { data, meta } = await useCase.execute({
    ...parsedQuery,
    userPublicId,
  })

  const formattedReply = BlogPresenter.toHTTP<BlogDetailedForAdminPresenterInput, HTTPBlogDetailedForAdmin>(
    data,
    tsyringeTokens.presenters.blog.blogDetailedForAdmin,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
