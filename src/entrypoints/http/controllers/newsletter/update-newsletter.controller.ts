import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateNewsletterBodyType } from '@custom-types/http/schemas/newsletter/update-newsletter-body-schema'
import type { UpdateNewsletterParamsType } from '@custom-types/http/schemas/newsletter/update-newsletter-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { NewsletterDefaultPresenter } from '@http/presenters/newsletter/newsletter-default.presenter'
import { UpdateNewsletterUseCase } from '@use-cases/newsletters/update-newsletter'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateNewsletterController implements IController {
  constructor(
    @inject(UpdateNewsletterUseCase)
    private readonly useCase: UpdateNewsletterUseCase,

    @inject(NewsletterDefaultPresenter)
    private readonly newsletterDefaultPresenter: NewsletterDefaultPresenter,
  ) {}

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

    const formattedReply = this.newsletterDefaultPresenter.toHTTP(newsletter)

    return await reply.sendResponse(formattedReply)
  }
}
