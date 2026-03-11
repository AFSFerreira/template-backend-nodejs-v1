import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindNewsletterByPublicIdParamsType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { NewsletterDetailedWithContentPresenter } from '@http/presenters/newsletter/newsletter-detailed-with-content.presenter'
import { FindNewsletterByPublicIdRestrictedUseCase } from '@use-cases/newsletters/find-newsletter-by-public-id-restricted'
import { inject, singleton } from 'tsyringe'

@singleton()
export class FindNewsletterByPublicIdRestrictedController implements IController {
  constructor(
    @inject(FindNewsletterByPublicIdRestrictedUseCase)
    private readonly useCase: FindNewsletterByPublicIdRestrictedUseCase,

    @inject(NewsletterDetailedWithContentPresenter)
    private readonly newsletterDetailedWithContentPresenter: NewsletterDetailedWithContentPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: FindNewsletterByPublicIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { newsletter } = await this.useCase.execute({ publicId })

    const formattedReply = this.newsletterDetailedWithContentPresenter.toHTTP(newsletter)

    return await reply.sendResponse(formattedReply)
  }
}
