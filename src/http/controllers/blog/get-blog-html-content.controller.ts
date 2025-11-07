import { makeGetBlogHtmlContentUseCase } from '@factories/blog/make-get-blog-html-content-use-case'
import { getBlogHtmlContentParamsSchema } from '@schemas/blog/get-blog-html-content-params-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getBlogHtmlContent(request: FastifyRequest, reply: FastifyReply) {
  const parsedParams = getBlogHtmlContentParamsSchema.parse(request.params)
  const getBlogHtmlContentUseCase = makeGetBlogHtmlContentUseCase()

  const { htmlContent } = await getBlogHtmlContentUseCase.execute(parsedParams)

  return await reply.status(200).type('text/html; charset=utf-8').send(htmlContent)
}
