import type { CustomBlogDetailed } from '@custom-types/adapter/blog-detailed'
import type { HTTPBlogDetailedForAdmin } from '@custom-types/presenter/blog/blog-detailed-for-admin'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BLOG_DETAILED_FOR_ADMIN } from '@constants/presenters-constants'
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

  return await reply.status(200).send({
    data: BlogPresenter.toHTTP<CustomBlogDetailed, HTTPBlogDetailedForAdmin>(data, BLOG_DETAILED_FOR_ADMIN),
    meta,
  })
}
