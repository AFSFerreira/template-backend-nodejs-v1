import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindNewsletterByPublicIdParamsType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { GetNewsletterHtmlContentUseCase } from '@use-cases/newsletters/get-newsletter-content'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetNewsletterHtmlContentController implements IController {
  constructor(
    @inject(GetNewsletterHtmlContentUseCase)
    private readonly useCase: GetNewsletterHtmlContentUseCase,
  ) {}

  async handle(request: ZodRequest<{ params: FindNewsletterByPublicIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { content } = await this.useCase.execute({ publicId })

    return await reply.sendHtml(content)
  }
}
