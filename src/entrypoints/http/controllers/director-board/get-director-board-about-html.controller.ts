import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetDirectorBoardAboutHTMLParamsType } from '@custom-types/http/schemas/director-board/get-director-board-about-html-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { GetDirectorBoardAboutHTMLUseCase } from '@use-cases/director-board/get-director-board-about-html'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetDirectorBoardAboutHTMLController implements IController {
  constructor(
    @inject(GetDirectorBoardAboutHTMLUseCase)
    private readonly useCase: GetDirectorBoardAboutHTMLUseCase,
  ) {}

  async handle(request: ZodRequest<{ params: GetDirectorBoardAboutHTMLParamsType }>, reply: FastifyReply) {
    const { htmlContent } = await this.useCase.execute(request.params)

    return await reply.status(StatusCodes.OK).sendHtml(htmlContent)
  }
}
