import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { HTTPAcademicPublication } from '@custom-types/http/presenter/academic-publication/academic-publication-default'
import type { AcademicPublicationSimplifiedPresenterInput } from '@custom-types/http/presenter/academic-publication/academic-publication-simplified'
import type { GetAllAcademicPublicationsQueryType } from '@custom-types/http/schemas/academic-pulication/get-all-academic-publications-query-schema'
import type { FastifyReply } from 'fastify'
import { AcademicPublicationPresenter } from '@http/presenters/academic-publication-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllAcademicPublicationsUseCase } from '@use-cases/academic-publication/get-all-academic-publications'
import { container } from 'tsyringe'

export async function getAllAcademicPublicationsController(
  request: ZodRequest<{ querystring: GetAllAcademicPublicationsQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllAcademicPublicationsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = AcademicPublicationPresenter.toHTTP<
    AcademicPublicationSimplifiedPresenterInput,
    HTTPAcademicPublication
  >(data, tsyringeTokens.presenters.academicPublication.academicPublicationSimplified)

  return await reply.sendPaginated(formattedReply, meta)
}
