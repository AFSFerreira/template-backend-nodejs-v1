import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllActivityAreasWithAcademicPublicationsQueryType } from '@custom-types/http/schemas/academic-publication/get-all-activity-areas-with-academic-publications-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { ActivityAreaWithAcademicPublicationsCountPresenter } from '@http/presenters/activity-area/activity-area-with-academic-publications-count.presenter'
import { GetAllActivityAreasWithAcademicPublicationsUseCase } from '@use-cases/academic-publication/get-all-activity-areas-with-academic-publications-use-case'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllActivityAreasWithAcademicPublicationsController implements IController {
  constructor(
    @inject(GetAllActivityAreasWithAcademicPublicationsUseCase)
    private readonly useCase: GetAllActivityAreasWithAcademicPublicationsUseCase,

    @inject(ActivityAreaWithAcademicPublicationsCountPresenter)
    private readonly activityAreaWithAcademicPublicationsCountPresenter: ActivityAreaWithAcademicPublicationsCountPresenter,
  ) {}

  async handle(
    request: ZodRequest<{ querystring: GetAllActivityAreasWithAcademicPublicationsQueryType }>,
    reply: FastifyReply,
  ) {
    const { data, meta } = await this.useCase.execute(request.query)

    const formattedReply = this.activityAreaWithAcademicPublicationsCountPresenter.toHTTP(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
