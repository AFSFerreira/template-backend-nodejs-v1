import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateNewsletterBodyType } from '@custom-types/http/schemas/newsletter/create-newsletter-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { NewsletterDefaultPresenter } from '@http/presenters/newsletter/newsletter-default.presenter'
import { CreateNewsletterUseCase } from '@use-cases/newsletters/create-newsletter'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreateNewsletterController implements IController {
  constructor(
    @inject(CreateNewsletterUseCase)
    private readonly useCase: CreateNewsletterUseCase,

    @inject(NewsletterDefaultPresenter)
    private readonly newsletterDefaultPresenter: NewsletterDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: CreateNewsletterBodyType }>, reply: FastifyReply) {
    const createNewsletterInput = request.body
    const { newsletter } = await this.useCase.execute(createNewsletterInput)

    const formattedReply = this.newsletterDefaultPresenter.toHTTP(newsletter)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
