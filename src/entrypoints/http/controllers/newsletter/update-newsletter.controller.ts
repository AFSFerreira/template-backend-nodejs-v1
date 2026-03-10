import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateNewsletterBodyType } from '@custom-types/http/schemas/newsletter/update-newsletter-body-schema'
import type { UpdateNewsletterParamsType } from '@custom-types/http/schemas/newsletter/update-newsletter-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UpdateNewsletterUseCase } from '@use-cases/newsletters/update-newsletter'
import type { FastifyReply } from 'fastify'
import { NewsletterDefaultPresenter } from '@http/presenters/newsletter/newsletter-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class UpdateNewsletterController implements IController {
  constructor(private useCase: UpdateNewsletterUseCase) {}

  async handle(
    request: ZodRequest<{ body: UpdateNewsletterBodyType; params: UpdateNewsletterParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const parsedBody = request.body
    const { newsletter } = await this.useCase.execute({
      publicId,
      body: parsedBody,
    })

    const formattedReply = NewsletterDefaultPresenter.toHTTP(newsletter)

    return await reply.sendResponse(formattedReply)
  }
}
