import { HTML_HEADER } from '@constants/header-constants'
import { makeGetBlogHtmlContentUseCase } from '@factories/blog/make-get-blog-html-content-use-case'
import { getBlogHtmlContentParamsSchema } from '@schemas/blog/get-blog-html-content-params-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getBlogHtmlContent(request: FastifyRequest, reply: FastifyReply) {
  const parsedParams = getBlogHtmlContentParamsSchema.parse(request.params)
  const useCase = makeGetBlogHtmlContentUseCase()

  const { htmlContent } = await useCase.execute(parsedParams)

  return await reply.status(200).type(HTML_HEADER).send(htmlContent)
}
