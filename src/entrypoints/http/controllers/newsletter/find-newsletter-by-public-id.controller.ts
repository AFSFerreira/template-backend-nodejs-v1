import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindNewsletterByPublicIdParamsType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { NewsletterDefaultPresenter } from '@http/presenters/newsletter/newsletter-default.presenter'
import { FindNewsletterByPublicIdUseCase } from '@use-cases/newsletters/find-newsletter-by-public-id'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindNewsletterByPublicIdController implements IController {
  constructor(
    @inject(FindNewsletterByPublicIdUseCase)
    private readonly useCase: FindNewsletterByPublicIdUseCase,

    @inject(NewsletterDefaultPresenter)
    private readonly newsletterDefaultPresenter: NewsletterDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: FindNewsletterByPublicIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { newsletter } = await this.useCase.execute({ publicId })

    const formattedReply = this.newsletterDefaultPresenter.toHTTP(newsletter)

    return await reply.sendResponse(formattedReply)
  }
}
