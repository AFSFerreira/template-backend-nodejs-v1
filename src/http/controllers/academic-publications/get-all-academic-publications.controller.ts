import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/adapter/academic-publication-simplified'
import type { HTTPAcademicPublication } from '@custom-types/presenter/academic-publication/academic-publication-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ACADEMIC_PUBLICATION_SIMPLIFIED_PRESENTER_KEY } from '@constants/presenters-constants'
import { AcademicPublicationPresenter } from '@presenters/variants/academic-publication-presenter'
import { getAllAcademicPublicationsQuerySchema } from '@schemas/academic-publication/get-all-academic-publications-query-schema'
import { GetAllAcademicPublicationsUseCase } from '@use-cases/academic-publication/get-all-academic-publications'
import { container } from 'tsyringe'

export async function getAllAcademicPublicationsController(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllAcademicPublicationsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllAcademicPublicationsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: AcademicPublicationPresenter.toHTTP<CustomAcademicPublicationWithSimplifiedDetails, HTTPAcademicPublication>(
      data,
      ACADEMIC_PUBLICATION_SIMPLIFIED_PRESENTER_KEY,
    ),
    meta,
  })
}
