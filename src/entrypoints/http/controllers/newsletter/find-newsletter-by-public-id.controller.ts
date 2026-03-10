import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindNewsletterByPublicIdParamsType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FindNewsletterByPublicIdUseCase } from '@use-cases/newsletters/find-newsletter-by-public-id'
import type { FastifyReply } from 'fastify'
import { NewsletterDefaultPresenter } from '@http/presenters/newsletter/newsletter-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class FindNewsletterByPublicIdController implements IController {
  constructor(private useCase: FindNewsletterByPublicIdUseCase) {}

  async handle(request: ZodRequest<{ params: FindNewsletterByPublicIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { newsletter } = await this.useCase.execute({ publicId })

    const formattedReply = NewsletterDefaultPresenter.toHTTP(newsletter)

    return await reply.sendResponse(formattedReply)
  }
}
