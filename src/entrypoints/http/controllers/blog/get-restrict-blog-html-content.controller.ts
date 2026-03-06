import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetRestrictBlogHtmlContentParamsType } from '@custom-types/http/schemas/blog/get-restrict-blog-html-content-params-schema'
import type { FastifyReply } from 'fastify'
import { HTML_HEADER } from '@constants/header-constants'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { GetRestrictBlogHTMLContentUseCase } from '@use-cases/blog/get-restrict-blog-html-content'
import { container } from 'tsyringe'

export async function getRestrictBlogHtmlContent(
  request: ZodRequest<{ params: GetRestrictBlogHtmlContentParamsType }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = request.params

  const useCase = container.resolve(GetRestrictBlogHTMLContentUseCase)

  const { htmlContent } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  return await reply.status(200).type(HTML_HEADER).send(htmlContent)
}
