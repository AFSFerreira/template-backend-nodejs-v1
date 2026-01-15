import type { HTTPBlogDetailedWithContent } from '@custom-types/http/presenter/blog/blog-detailed-with-content'
import type { BlogWithDetails } from '@custom-types/validators/blog-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { BlogPresenter } from '@presenters/blog-presenter'
import { findBlogByPublicIdParamsSchema } from '@schemas/blog/find-blog-by-public-id-query-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { FindBlogByPublicIdRestrictedUseCase } from '@use-cases/blogs/find-blog-by-public-id-detailed'
import { container } from 'tsyringe'

export async function findBlogByPublicIdRestricted(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const { publicId } = findBlogByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(FindBlogByPublicIdRestrictedUseCase)

  const { blog } = await useCase.execute({ publicId, userPublicId })

  const formattedReply = BlogPresenter.toHTTP<BlogWithDetails, HTTPBlogDetailedWithContent>(
    blog,
    tokens.presenters.blog.blogDetailedWithContent,
  )

  return await reply.status(200).send({ data: formattedReply })
}
