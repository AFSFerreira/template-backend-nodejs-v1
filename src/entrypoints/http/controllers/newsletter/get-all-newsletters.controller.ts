import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllNewslettersQueryType } from '@custom-types/http/schemas/newsletter/get-all-newsletters-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { NewsletterDefaultPresenter } from '@http/presenters/newsletter/newsletter-default.presenter'
import { GetAllNewslettersUseCase } from '@use-cases/newsletters/get-all-newsletters'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllNewslettersController implements IController {
  constructor(
    @inject(GetAllNewslettersUseCase)
    private readonly useCase: GetAllNewslettersUseCase,

    @inject(NewsletterDefaultPresenter)
    private readonly newsletterDefaultPresenter: NewsletterDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllNewslettersQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = this.newsletterDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
