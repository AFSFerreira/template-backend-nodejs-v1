import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  ActivityAreaWithAcademicPublicationsCountPresenterInput,
  HTTPActivityAreaWithAcademicPublicationsCount,
} from '@custom-types/http/presenter/academic-publication/activity-area-with-academic-publications-count'
import type { GetAllActivityAreasWithAcademicPublicationsQueryType } from '@custom-types/http/schemas/academic-publication/get-all-activity-areas-with-academic-publications-query-schema'
import type { FastifyReply } from 'fastify'
import { ActivityAreaPresenter } from '@http/presenters/activity-area-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllActivityAreasWithAcademicPublicationsUseCase } from '@use-cases/academic-publication/get-all-activity-areas-with-academic-publications-use-case'
import { container } from 'tsyringe'

export async function getAllActivityAreasWithAcademicPublicationsController(
  request: ZodRequest<{ querystring: GetAllActivityAreasWithAcademicPublicationsQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllActivityAreasWithAcademicPublicationsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = ActivityAreaPresenter.toHTTP<
    ActivityAreaWithAcademicPublicationsCountPresenterInput,
    HTTPActivityAreaWithAcademicPublicationsCount
  >(data, tsyringeTokens.presenters.activityArea.activityAreaWithAcademicPublicationsCount)

  return await reply.sendPaginated(formattedReply, meta)
}
