import type {
  ActivityAreaWithBlogsCountPresenterInput,
  HTTPActivityAreaWithBlogsCount,
} from '@custom-types/http/presenter/activity-area/activity-area-with-blogs-count'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ActivityAreaPresenter } from '@http/presenters/activity-area-presenter'
import { getAllActivityAreasWithBlogsQuerySchema } from '@http/schemas/activity-area/get-all-activity-areas-with-blogs-query-schema'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllActivityAreasWithBlogsUseCase } from '@use-cases/activity-area/get-all-activity-areas-with-blogs-use-case'
import { container } from 'tsyringe'

export async function getAllActivityAreasWithBlogs(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllActivityAreasWithBlogsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllActivityAreasWithBlogsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = ActivityAreaPresenter.toHTTP<
    ActivityAreaWithBlogsCountPresenterInput,
    HTTPActivityAreaWithBlogsCount
  >(data, tsyringeTokens.presenters.activityArea.activityAreaWithBlogsCount)

  return await reply.status(200).send({ data: formattedReply, meta })
}
