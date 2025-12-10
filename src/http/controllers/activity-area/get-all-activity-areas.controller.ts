import type { HTTPActivityArea } from '@custom-types/presenter/activity-area/activity-area-default'
import type { ActivityArea } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ActivityAreaPresenter } from '@presenters/variants/activity-area-presenter'
import { getAllActivityAreasSchema } from '@schemas/activity-area/get-all-activity-areas-schema'
import { GetAllActivityAreasUseCase } from '@use-cases/activity-area/get-all-activity-areas-use-case'
import { container } from 'tsyringe'

export async function getAllActivityAreas(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllActivityAreasSchema.parse(request.query)

  const useCase = container.resolve(GetAllActivityAreasUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: ActivityAreaPresenter.toHTTP<ActivityArea, HTTPActivityArea>(data),
    meta,
  })
}
