import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindNewsletterTemplateByPublicIdParamsType } from '@custom-types/http/schemas/newsletter-template/find-newsletter-template-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { NewsletterTemplateDefaultPresenter } from '@http/presenters/newsletter-template/newsletter-template-default.presenter'
import { FindNewsletterTemplateByPublicIdUseCase } from '@use-cases/newsletters/find-newsletter-template-by-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class FindNewsletterTemplateByPublicIdController implements IController {
  constructor(
    @inject(FindNewsletterTemplateByPublicIdUseCase)
    private readonly useCase: FindNewsletterTemplateByPublicIdUseCase,

    @inject(NewsletterTemplateDefaultPresenter)
    private readonly newsletterTemplateDefaultPresenter: NewsletterTemplateDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: FindNewsletterTemplateByPublicIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { newsletterTemplate } = await this.useCase.execute({ publicId })

    const formattedReply = this.newsletterTemplateDefaultPresenter.toHTTP(newsletterTemplate)

    return await reply.sendResponse(formattedReply)
  }
}
