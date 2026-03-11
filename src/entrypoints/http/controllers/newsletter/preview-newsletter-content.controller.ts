import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { PreviewNewsletterContentBodyType } from '@custom-types/http/schemas/newsletter/preview-newsletter-content-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { PreviewNewsletterContentUseCase } from '@use-cases/newsletters/preview-newsletter-content'
import { inject, singleton } from 'tsyringe'

@singleton()
export class PreviewNewsletterContentController implements IController {
  constructor(
    @inject(PreviewNewsletterContentUseCase)
    private readonly useCase: PreviewNewsletterContentUseCase,
  ) {}

  async handle(request: ZodRequest<{ body: PreviewNewsletterContentBodyType }>, reply: FastifyReply) {
    const { html } = await this.useCase.execute(request.body)

    return await reply.sendHtml(html)
  }
}
