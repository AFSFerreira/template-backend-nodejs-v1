import type { FastifyReply, FastifyRequest } from 'fastify'
import { HTML_HEADER } from '@constants/header-constants'
import { getDirectorBoardAboutHTMLParamsSchema } from '@schemas/director-board/get-director-board-about-html-params-schema'
import { GetDirectorBoardAboutHTMLUseCase } from '@use-cases/director-board/get-director-board-about-html'
import { container } from 'tsyringe'

export async function getDirectorBoardAboutHTML(request: FastifyRequest, reply: FastifyReply) {
  const parsedParams = getDirectorBoardAboutHTMLParamsSchema.parse(request.params)

  const useCase = container.resolve(GetDirectorBoardAboutHTMLUseCase)

  const { htmlContent } = await useCase.execute(parsedParams)

  return await reply.status(200).type(HTML_HEADER).send(htmlContent)
}
