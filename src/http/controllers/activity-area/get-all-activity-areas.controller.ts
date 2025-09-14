import { ActivityAreaPresenter } from '@presenters/activity-area-presenter'
import { getAllActivityAreasSchema } from '@schemas/activity-area/get-all-activity-areas-schema'
import { makeGetAllActivityAreasUseCase } from '@use-cases/factories/activity-area/make-get-all-activity-areas-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllActivityAreas(request: FastifyRequest, reply: FastifyReply) {
  const { name, type, page, limit } = getAllActivityAreasSchema.parse(request.query)

  const getAllActivityAreasUseCase = makeGetAllActivityAreasUseCase()

  const { data, meta } = await getAllActivityAreasUseCase.execute({
    name,
    type,
    page,
    limit,
  })

  return await reply.status(200).send({
    data: ActivityAreaPresenter.toHTTP(data),
    meta,
  })
}
