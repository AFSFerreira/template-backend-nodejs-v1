import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { GetInstitutionalInfoAboutHTMLUseCase } from '@use-cases/institutional-info/get-institutional-info-about-html'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetInstitutionalInfoAboutDescriptionHTMLController implements IController {
  constructor(
    @inject(GetInstitutionalInfoAboutHTMLUseCase)
    private readonly useCase: GetInstitutionalInfoAboutHTMLUseCase,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const { htmlContent } = await this.useCase.execute()

    return await reply.status(StatusCodes.OK).sendHtml(htmlContent)
  }
}
