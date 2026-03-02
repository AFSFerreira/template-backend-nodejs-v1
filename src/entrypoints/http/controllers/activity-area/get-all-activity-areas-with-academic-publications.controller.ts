import type {
  ActivityAreaWithAcademicPublicationsCountPresenterInput,
  HTTPActivityAreaWithAcademicPublicationsCount,
} from '@custom-types/http/presenter/academic-publication/activity-area-with-academic-publications-count'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ActivityAreaPresenter } from '@http/presenters/activity-area-presenter'
import { getAllActivityAreasWithAcademicPublicationsQuerySchema } from '@http/schemas/academic-publication/get-all-activity-areas-with-academic-publications-query-schema'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllActivityAreasWithAcademicPublicationsUseCase } from '@use-cases/academic-publication/get-all-activity-areas-with-academic-publications-use-case'
import { container } from 'tsyringe'

export async function getAllActivityAreasWithAcademicPublicationsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsedQuery = getAllActivityAreasWithAcademicPublicationsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllActivityAreasWithAcademicPublicationsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = ActivityAreaPresenter.toHTTP<
    ActivityAreaWithAcademicPublicationsCountPresenterInput,
    HTTPActivityAreaWithAcademicPublicationsCount
  >(data, tsyringeTokens.presenters.activityArea.activityAreaWithAcademicPublicationsCount)

  return await reply.status(200).send({ data: formattedReply, meta })
}
