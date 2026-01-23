import type { HTTPAcademicPublication } from '@custom-types/http/presenter/academic-publication/academic-publication-default'
import type { AcademicPublicationSimplifiedPresenterInput } from '@custom-types/http/presenter/academic-publication/academic-publication-simplified'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { AcademicPublicationPresenter } from '@presenters/academic-publication-presenter'
import { getAllAcademicPublicationsQuerySchema } from '@schemas/academic-publication/get-all-academic-publications-query-schema'
import { GetAllAcademicPublicationsUseCase } from '@use-cases/academic-publication/get-all-academic-publications'
import { container } from 'tsyringe'

export async function getAllAcademicPublicationsController(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllAcademicPublicationsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllAcademicPublicationsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = AcademicPublicationPresenter.toHTTP<
    AcademicPublicationSimplifiedPresenterInput,
    HTTPAcademicPublication
  >(data, tsyringeTokens.presenters.academicPublication.academicPublicationSimplified)

  return await reply.status(200).send({ data: formattedReply, meta })
}
