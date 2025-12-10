import type { CustomBlogWithSimplifiedDetails } from '@custom-types/adapter/blog-simplified'
import type { HTTPSimplifiedBlog } from '@custom-types/presenter/blog/blog-simplified'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BLOG_SIMPLIFIED_PRESENTER_KEY } from '@constants/presenters-constants'
import { BlogPresenter } from '@presenters/variants/blog-presenter'
import { getAllPostsQuerySchema } from '@schemas/blog/get-all-posts-query-schema'
import { GetAllBlogsUseCase } from '@use-cases/blogs/get-all-blogs'
import { container } from 'tsyringe'

export async function getAllBlogs(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllPostsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllBlogsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: BlogPresenter.toHTTP<CustomBlogWithSimplifiedDetails, HTTPSimplifiedBlog>(
      data,
      BLOG_SIMPLIFIED_PRESENTER_KEY,
    ),
    meta,
  })
}
