import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  ActivityAreaDefaultPresenterInput,
  HTTPActivityArea,
} from '@custom-types/http/presenter/activity-area/activity-area-default'
import type { GetAllActivityAreasType } from '@custom-types/http/schemas/activity-area/get-all-activity-areas-schema'
import type { FastifyReply } from 'fastify'
import { ActivityAreaPresenter } from '@http/presenters/activity-area-presenter'
import { GetAllActivityAreasUseCase } from '@use-cases/activity-area/get-all-activity-areas-use-case'
import { container } from 'tsyringe'

export async function getAllActivityAreas(
  request: ZodRequest<{ querystring: GetAllActivityAreasType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllActivityAreasUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = ActivityAreaPresenter.toHTTP<ActivityAreaDefaultPresenterInput, HTTPActivityArea>(data)

  return await reply.sendPaginated(formattedReply, meta)
}
