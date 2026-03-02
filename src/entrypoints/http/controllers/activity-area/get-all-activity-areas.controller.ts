import type {
  ActivityAreaDefaultPresenterInput,
  HTTPActivityArea,
} from '@custom-types/http/presenter/activity-area/activity-area-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ActivityAreaPresenter } from '@http/presenters/activity-area-presenter'
import { getAllActivityAreasSchema } from '@http/schemas/activity-area/get-all-activity-areas-schema'
import { GetAllActivityAreasUseCase } from '@use-cases/activity-area/get-all-activity-areas-use-case'
import { container } from 'tsyringe'

export async function getAllActivityAreas(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllActivityAreasSchema.parse(request.query)

  const useCase = container.resolve(GetAllActivityAreasUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = ActivityAreaPresenter.toHTTP<ActivityAreaDefaultPresenterInput, HTTPActivityArea>(data)

  return await reply.status(200).send({ data: formattedReply, meta })
}
