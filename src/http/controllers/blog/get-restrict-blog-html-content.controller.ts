import { HTML_HEADER } from '@constants/header-constants'
import { getRestrictBlogHtmlContentParamsSchema } from '@schemas/blog/get-restrict-blog-html-content-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { GetRestrictBlogHTMLContentUseCase } from '@use-cases/blog/get-restrict-blog-html-content'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function getRestrictBlogHtmlContent(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = getRestrictBlogHtmlContentParamsSchema.parse(request.params)

  const useCase = container.resolve(GetRestrictBlogHTMLContentUseCase)

  const { htmlContent } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  return await reply.status(200).type(HTML_HEADER).send(htmlContent)
}
