import { ActivityAreaPresenter } from '@presenters/activity-area-presenter'
import { getAllActivityAreasSchema } from '@schemas/activity-area/get-all-activity-areas-schema'
import { makeGetAllActivityAreasUseCase } from '@use-cases/factories/activity-area/make-get-all-activity-areas-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllActivityAreas(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllActivityAreasSchema.parse(request.query)

  const useCase = makeGetAllActivityAreasUseCase()

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: ActivityAreaPresenter.toHTTP(data),
    meta,
  })
}
