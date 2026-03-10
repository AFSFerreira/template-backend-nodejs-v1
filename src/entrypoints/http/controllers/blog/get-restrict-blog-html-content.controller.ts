import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetRestrictBlogHtmlContentParamsType } from '@custom-types/http/schemas/blog/get-restrict-blog-html-content-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetRestrictBlogHTMLContentUseCase } from '@use-cases/blog/get-restrict-blog-html-content'
import type { FastifyReply } from 'fastify'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class GetRestrictBlogHtmlContentController implements IController {
  constructor(private useCase: GetRestrictBlogHTMLContentUseCase) {}

  async handle(request: ZodRequest<{ params: GetRestrictBlogHtmlContentParamsType }>, reply: FastifyReply) {
    const userPublicId = getRequestUserPublicId(request)
    const parsedParams = request.params
    const { htmlContent } = await this.useCase.execute({
      ...parsedParams,
      userPublicId,
    })

    return await reply.status(StatusCodes.OK).sendHtml(htmlContent)
  }
}
