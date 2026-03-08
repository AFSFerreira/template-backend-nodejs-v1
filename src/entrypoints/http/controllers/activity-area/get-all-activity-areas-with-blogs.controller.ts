import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  ActivityAreaWithBlogsCountPresenterInput,
  HTTPActivityAreaWithBlogsCount,
} from '@custom-types/http/presenter/activity-area/activity-area-with-blogs-count'
import type { GetAllActivityAreasWithBlogsQueryType } from '@custom-types/http/schemas/activity-area/get-all-activity-areas-with-blogs-query-schema'
import type { FastifyReply } from 'fastify'
import { ActivityAreaPresenter } from '@http/presenters/activity-area-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllActivityAreasWithBlogsUseCase } from '@use-cases/activity-area/get-all-activity-areas-with-blogs-use-case'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getAllActivityAreasWithBlogs(
  request: ZodRequest<{ querystring: GetAllActivityAreasWithBlogsQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllActivityAreasWithBlogsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = ActivityAreaPresenter.toHTTP<
    ActivityAreaWithBlogsCountPresenterInput,
    HTTPActivityAreaWithBlogsCount
  >(data, tsyringeTokens.presenters.activityArea.activityAreaWithBlogsCount)

  return await reply.status(StatusCodes.OK).send({ data: formattedReply, meta })
}
