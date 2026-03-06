import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetBlogHtmlContentParamsType } from '@custom-types/http/schemas/blog/get-blog-html-content-params-schema'
import type { FastifyReply } from 'fastify'
import { HTML_HEADER } from '@constants/header-constants'
import { GetBlogHTMLContentUseCase } from '@use-cases/blog/get-blog-html-content'
import { container } from 'tsyringe'

export async function getBlogHtmlContent(
  request: ZodRequest<{ params: GetBlogHtmlContentParamsType }>,
  reply: FastifyReply,
) {
  const parsedParams = request.params

  const useCase = container.resolve(GetBlogHTMLContentUseCase)

  const { htmlContent } = await useCase.execute(parsedParams)

  return await reply.status(200).type(HTML_HEADER).send(htmlContent)
}
