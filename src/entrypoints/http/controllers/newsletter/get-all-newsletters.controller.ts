import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllNewslettersQueryType } from '@custom-types/http/schemas/newsletter/get-all-newsletters-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { NewsletterDefaultPresenter } from '@http/presenters/newsletter/newsletter-default.presenter'
import { GetAllNewslettersUseCase } from '@use-cases/newsletters/get-all-newsletters'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllNewslettersController implements IController {
  constructor(
    @inject(GetAllNewslettersUseCase)
    private readonly useCase: GetAllNewslettersUseCase,

    @inject(NewsletterDefaultPresenter)
    private readonly newsletterDefaultPresenter: NewsletterDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllNewslettersQueryType }>, reply: FastifyReply) {
    const { data, meta } = await this.useCase.execute(request.query)

    const formattedReply = this.newsletterDefaultPresenter.toHTTP(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
