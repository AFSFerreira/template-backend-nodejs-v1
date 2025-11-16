import { ACADEMIC_PUBLICATION_FILTERED_PRESENTER_KEY } from '@constants/presenters-constants'
import { AcademicPublicationPresenter } from '@presenters/academic-publication-presenter'
import { getAllAcademicPublicationsQuerySchema } from '@schemas/academic-publication/get-all-academic-publications-query-schema'
import { makeGetAllAcademicPublicationsUseCase } from '@use-cases/factories/academic-publication/make-get-all-academic-publications-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllAcademicPublicationsController(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllAcademicPublicationsQuerySchema.parse(request.query)
  const getAllAcademicPublicationsUseCase = makeGetAllAcademicPublicationsUseCase()

  const { data, meta } = await getAllAcademicPublicationsUseCase.execute(parsedQuery)

  return await reply
    .status(200)
    .send({ data: AcademicPublicationPresenter.toHTTP(data, ACADEMIC_PUBLICATION_FILTERED_PRESENTER_KEY), meta })
}
