import { ACADEMIC_PUBLICATION_FILTERED_PRESENTER_KEY } from '@constants/presenters-constants'
import { AcademicPublicationPresenter } from '@presenters/academic-publication-presenter'
import { getAllAcademicPublicationsQuerySchema } from '@schemas/academic-publication/get-all-academic-publications-query-schema'
import { GetAllAcademicPublicationsUseCase } from '@use-cases/academic-publication/get-all-academic-publications'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function getAllAcademicPublicationsController(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllAcademicPublicationsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllAcademicPublicationsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply
    .status(200)
    .send({ data: AcademicPublicationPresenter.toHTTP(data, ACADEMIC_PUBLICATION_FILTERED_PRESENTER_KEY), meta })
}
