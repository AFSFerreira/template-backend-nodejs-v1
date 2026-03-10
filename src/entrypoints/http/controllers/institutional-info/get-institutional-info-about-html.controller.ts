import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetInstitutionalInfoAboutHTMLUseCase } from '@use-cases/institutional-info/get-institutional-info-about-html'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class GetInstitutionalInfoAboutDescriptionHTMLController implements IController {
  constructor(private useCase: GetInstitutionalInfoAboutHTMLUseCase) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const { htmlContent } = await this.useCase.execute()

    return await reply.status(StatusCodes.OK).sendHtml(htmlContent)
  }
}
