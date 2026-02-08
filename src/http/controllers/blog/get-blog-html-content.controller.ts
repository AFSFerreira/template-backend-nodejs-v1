import type { FastifyReply, FastifyRequest } from 'fastify'
import { HTML_HEADER } from '@constants/header-constants'
import { getBlogHtmlContentParamsSchema } from '@schemas/blog/get-blog-html-content-params-schema'
import { GetBlogHTMLContentUseCase } from '@use-cases/blog/get-blog-html-content'
import { container } from 'tsyringe'

export async function getBlogHtmlContent(request: FastifyRequest, reply: FastifyReply) {
  const parsedParams = getBlogHtmlContentParamsSchema.parse(request.params)

  const useCase = container.resolve(GetBlogHTMLContentUseCase)

  const { htmlContent } = await useCase.execute(parsedParams)

  return await reply.status(200).type(HTML_HEADER).send(htmlContent)
}
