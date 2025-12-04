import { BLOG_SIMPLIFIED_PRESENTER_KEY } from '@constants/presenters-constants'
import { BlogPresenter } from '@presenters/blog-presenter'
import { getAllPostsQuerySchema } from '@schemas/blog/get-all-posts-query-schema'
import { makeGetAllBlogsUseCase } from '@use-cases/factories/blog/make-get-all-blogs-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllBlogs(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllPostsQuerySchema.parse(request.query)
  const useCase = makeGetAllBlogsUseCase()

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({ data: BlogPresenter.toHTTP(data, BLOG_SIMPLIFIED_PRESENTER_KEY), meta })
}
