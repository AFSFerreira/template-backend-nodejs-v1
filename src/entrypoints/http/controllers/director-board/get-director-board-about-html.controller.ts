import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetDirectorBoardAboutHTMLParamsType } from '@custom-types/http/schemas/director-board/get-director-board-about-html-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetDirectorBoardAboutHTMLUseCase } from '@use-cases/director-board/get-director-board-about-html'
import type { FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class GetDirectorBoardAboutHTMLController implements IController {
  constructor(private useCase: GetDirectorBoardAboutHTMLUseCase) {}

  async handle(request: ZodRequest<{ params: GetDirectorBoardAboutHTMLParamsType }>, reply: FastifyReply) {
    const parsedParams = request.params
    const { htmlContent } = await this.useCase.execute(parsedParams)

    return await reply.status(StatusCodes.OK).sendHtml(htmlContent)
  }
}
