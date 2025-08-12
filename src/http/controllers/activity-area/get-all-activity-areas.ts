import type { FastifyReply, FastifyRequest } from 'fastify'
import { ActivityAreaPresenter } from '@/http/presenters/activity-area-presenter'
import { getAllActivityAreasSchema } from '@/http/schemas/activity-area/get-all-activity-areas-schema'
import { makeGetAllActivityAreasUseCase } from '@/use-cases/factories/activity-area/make-get-all-activity-areas-use-case'

export async function getAllActivityAreas(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, type, page, limit } = getAllActivityAreasSchema.parse(
    request.query,
  )

  const getAllActivityAreasUseCase = makeGetAllActivityAreasUseCase()

  try {
    const { activityAreas, totalItems } =
      await getAllActivityAreasUseCase.execute({ name, type, page, limit })

    const paginationMetaData = {
      totalItems,
      totalPages: Math.ceil(totalItems / page),
      currentPage: page,
      pageSize: limit,
    }

    return await reply.status(200).send({
      activityAreas: ActivityAreaPresenter.toHTTP(activityAreas),
      ...paginationMetaData,
    })
  } catch (error) {}
}
