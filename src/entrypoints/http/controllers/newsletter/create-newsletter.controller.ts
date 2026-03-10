import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateNewsletterBodyType } from '@custom-types/http/schemas/newsletter/create-newsletter-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { CreateNewsletterUseCase } from '@use-cases/newsletters/create-newsletter'
import type { FastifyReply } from 'fastify'
import { NewsletterDefaultPresenter } from '@http/presenters/newsletter/newsletter-default.presenter'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class CreateNewsletterController implements IController {
  constructor(private useCase: CreateNewsletterUseCase) {}

  async handle(request: ZodRequest<{ body: CreateNewsletterBodyType }>, reply: FastifyReply) {
    const createNewsletterInput = request.body
    const { newsletter } = await this.useCase.execute(createNewsletterInput)

    const formattedReply = NewsletterDefaultPresenter.toHTTP(newsletter)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
