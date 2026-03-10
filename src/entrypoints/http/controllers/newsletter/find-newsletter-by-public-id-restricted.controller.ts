import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindNewsletterByPublicIdParamsType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FindNewsletterByPublicIdRestrictedUseCase } from '@use-cases/newsletters/find-newsletter-by-public-id-restricted'
import type { FastifyReply } from 'fastify'
import { NewsletterDetailedWithContentPresenter } from '@http/presenters/newsletter/newsletter-detailed-with-content.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class FindNewsletterByPublicIdRestrictedController implements IController {
  constructor(private useCase: FindNewsletterByPublicIdRestrictedUseCase) {}

  async handle(request: ZodRequest<{ params: FindNewsletterByPublicIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { newsletter } = await this.useCase.execute({ publicId })

    const formattedReply = NewsletterDetailedWithContentPresenter.toHTTP(newsletter)

    return await reply.sendResponse(formattedReply)
  }
}
