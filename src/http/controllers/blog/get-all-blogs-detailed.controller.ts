import type {
  HTTPBlogDetailedForAdmin,
  IBlogDetailedForAdmin,
} from '@custom-types/presenter/blog/blog-detailed-for-admin'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { BlogPresenter } from '@presenters/variants/blog-presenter'
import { getAllBlogsDetailedQuerySchema } from '@schemas/blog/get-all-blogs-detailed-query-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { GetAllBlogsDetailedUseCase } from '@use-cases/blogs/get-all-blogs-detailed'
import { container } from 'tsyringe'

export async function getAllBlogsDetailed(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedQuery = getAllBlogsDetailedQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllBlogsDetailedUseCase)

  const { data, meta } = await useCase.execute({
    ...parsedQuery,
    userPublicId,
  })

  const formattedReply = BlogPresenter.toHTTP<IBlogDetailedForAdmin, HTTPBlogDetailedForAdmin>(
    data,
    tokens.presenters.blogDetailedForAdmin,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
