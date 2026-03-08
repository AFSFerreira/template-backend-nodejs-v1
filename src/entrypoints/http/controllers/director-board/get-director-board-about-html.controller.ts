import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetDirectorBoardAboutHTMLParamsType } from '@custom-types/http/schemas/director-board/get-director-board-about-html-params-schema'
import type { FastifyReply } from 'fastify'
import { HTML_HEADER } from '@constants/header-constants'
import { GetDirectorBoardAboutHTMLUseCase } from '@use-cases/director-board/get-director-board-about-html'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getDirectorBoardAboutHTML(
  request: ZodRequest<{ params: GetDirectorBoardAboutHTMLParamsType }>,
  reply: FastifyReply,
) {
  const parsedParams = request.params

  const useCase = container.resolve(GetDirectorBoardAboutHTMLUseCase)

  const { htmlContent } = await useCase.execute(parsedParams)

  return await reply.status(StatusCodes.OK).type(HTML_HEADER).send(htmlContent)
}
