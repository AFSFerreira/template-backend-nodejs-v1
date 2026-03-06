import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  AcademicPublicationYearPresenterInput,
  HTTPAcademicPublicationYear,
} from '@custom-types/http/presenter/academic-publication/academic-publication-year'
import type { GetAcademicPublicationsYearsQueryType } from '@custom-types/http/schemas/academic-pulication/get-academic-publications-years-query-schema'
import type { FastifyReply } from 'fastify'
import { AcademicPublicationPresenter } from '@http/presenters/academic-publication-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAcademicPublicationsYearsUseCase } from '@use-cases/academic-publication/get-academic-publications-years'
import { container } from 'tsyringe'

export async function getAcademicPublicationsYearsController(
  request: ZodRequest<{ querystring: GetAcademicPublicationsYearsQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAcademicPublicationsYearsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = AcademicPublicationPresenter.toHTTP<
    AcademicPublicationYearPresenterInput,
    HTTPAcademicPublicationYear
  >(data, tsyringeTokens.presenters.academicPublication.academicPublicationYear)

  return await reply.status(200).send({ data: formattedReply, meta })
}
