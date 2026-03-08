import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  BlogSimplifiedPresenterInput,
  HTTPSimplifiedBlog,
} from '@custom-types/http/presenter/blog/blog-simplified'
import type { GetAllBlogsQueryType } from '@custom-types/http/schemas/blog/get-all-blogs-query-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllBlogsUseCase } from '@use-cases/blog/get-all-blogs'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getAllBlogs(request: ZodRequest<{ querystring: GetAllBlogsQueryType }>, reply: FastifyReply) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllBlogsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = BlogPresenter.toHTTP<BlogSimplifiedPresenterInput, HTTPSimplifiedBlog>(
    data,
    tsyringeTokens.presenters.blog.blogSimplified,
  )

  return await reply.status(StatusCodes.OK).send({ data: formattedReply, meta })
}
