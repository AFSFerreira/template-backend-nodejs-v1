import type {
  BlogSimplifiedPresenterInput,
  HTTPSimplifiedBlog,
} from '@custom-types/http/presenter/blog/blog-simplified'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { getAllBlogsQuerySchema } from '@http/schemas/blog/get-all-blogs-query-schema'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllBlogsUseCase } from '@use-cases/blog/get-all-blogs'
import { container } from 'tsyringe'

export async function getAllBlogs(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllBlogsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllBlogsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = BlogPresenter.toHTTP<BlogSimplifiedPresenterInput, HTTPSimplifiedBlog>(
    data,
    tsyringeTokens.presenters.blog.blogSimplified,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
