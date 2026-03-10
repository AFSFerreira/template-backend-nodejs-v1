import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllNewsletterTemplatesQueryType } from '@custom-types/http/schemas/newsletter/get-all-newsletter-templates-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllNewsletterTemplatesUseCase } from '@use-cases/newsletters/get-all-newsletter-templates'
import type { FastifyReply } from 'fastify'
import { NewsletterTemplateDefaultPresenter } from '@http/presenters/newsletter-template/newsletter-template-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllNewsletterTemplatesController implements IController {
  constructor(private useCase: GetAllNewsletterTemplatesUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllNewsletterTemplatesQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = NewsletterTemplateDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
