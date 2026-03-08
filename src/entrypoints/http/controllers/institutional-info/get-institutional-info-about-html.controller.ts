import type { FastifyReply, FastifyRequest } from 'fastify'
import { HTML_HEADER } from '@constants/header-constants'
import { GetInstitutionalInfoAboutHTMLUseCase } from '@use-cases/institutional-info/get-institutional-info-about-html'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getInstitutionalInfoAboutDescriptionHTML(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetInstitutionalInfoAboutHTMLUseCase)

  const { htmlContent } = await useCase.execute()

  return await reply.status(StatusCodes.OK).type(HTML_HEADER).send(htmlContent)
}
