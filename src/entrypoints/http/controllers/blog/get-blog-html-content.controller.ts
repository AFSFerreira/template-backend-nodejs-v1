import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetBlogHtmlContentParamsType } from '@custom-types/http/schemas/blog/get-blog-html-content-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { GetBlogHTMLContentUseCase } from '@use-cases/blog/get-blog-html-content'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetBlogHtmlContentController implements IController {
  constructor(
    @inject(GetBlogHTMLContentUseCase)
    private readonly useCase: GetBlogHTMLContentUseCase,
  ) {}

  async handle(request: ZodRequest<{ params: GetBlogHtmlContentParamsType }>, reply: FastifyReply) {
    const { htmlContent } = await this.useCase.execute(request.params)

    return await reply.status(StatusCodes.OK).sendHtml(htmlContent)
  }
}
