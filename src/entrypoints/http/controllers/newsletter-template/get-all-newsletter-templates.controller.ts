import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllNewsletterTemplatesQueryType } from '@custom-types/http/schemas/newsletter/get-all-newsletter-templates-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { NewsletterTemplateDefaultPresenter } from '@http/presenters/newsletter-template/newsletter-template-default.presenter'
import { GetAllNewsletterTemplatesUseCase } from '@use-cases/newsletters/get-all-newsletter-templates'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllNewsletterTemplatesController implements IController {
  constructor(
    @inject(GetAllNewsletterTemplatesUseCase)
    private readonly useCase: GetAllNewsletterTemplatesUseCase,

    @inject(NewsletterTemplateDefaultPresenter)
    private readonly newsletterTemplateDefaultPresenter: NewsletterTemplateDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllNewsletterTemplatesQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = this.newsletterTemplateDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
