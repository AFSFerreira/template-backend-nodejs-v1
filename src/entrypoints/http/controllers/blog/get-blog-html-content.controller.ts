import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetBlogHtmlContentParamsType } from '@custom-types/http/schemas/blog/get-blog-html-content-params-schema'
import type { FastifyReply } from 'fastify'
import { GetBlogHTMLContentUseCase } from '@use-cases/blog/get-blog-html-content'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getBlogHtmlContent(
  request: ZodRequest<{ params: GetBlogHtmlContentParamsType }>,
  reply: FastifyReply,
) {
  const parsedParams = request.params

  const useCase = container.resolve(GetBlogHTMLContentUseCase)

  const { htmlContent } = await useCase.execute(parsedParams)

  return await reply.status(StatusCodes.OK).sendHtml(htmlContent)
}
