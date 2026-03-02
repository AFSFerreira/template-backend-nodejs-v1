import type {
  AcademicPublicationYearPresenterInput,
  HTTPAcademicPublicationYear,
} from '@custom-types/http/presenter/academic-publication/academic-publication-year'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { AcademicPublicationPresenter } from '@presenters/academic-publication-presenter'
import { getAcademicPublicationsYearsQuerySchema } from '@schemas/academic-publication/get-academic-publications-years-query-schema'
import { GetAcademicPublicationsYearsUseCase } from '@use-cases/academic-publication/get-academic-publications-years'
import { container } from 'tsyringe'

export async function getAcademicPublicationsYearsController(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAcademicPublicationsYearsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAcademicPublicationsYearsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = AcademicPublicationPresenter.toHTTP<
    AcademicPublicationYearPresenterInput,
    HTTPAcademicPublicationYear
  >(data, tsyringeTokens.presenters.academicPublication.academicPublicationYear)

  return await reply.status(200).send({ data: formattedReply, meta })
}
