import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllNewslettersQueryType } from '@custom-types/http/schemas/newsletter/get-all-newsletters-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllNewslettersUseCase } from '@use-cases/newsletters/get-all-newsletters'
import type { FastifyReply } from 'fastify'
import { NewsletterDefaultPresenter } from '@http/presenters/newsletter/newsletter-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllNewslettersController implements IController {
  constructor(private useCase: GetAllNewslettersUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllNewslettersQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = NewsletterDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
