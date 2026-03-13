import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllAcademicPublicationsQueryType } from '@custom-types/http/schemas/academic-pulication/get-all-academic-publications-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { AcademicPublicationFilteredPresenter } from '@http/presenters/academic-publication/academic-publication-simplified.presenter'
import { GetAllAcademicPublicationsUseCase } from '@use-cases/academic-publication/get-all-academic-publications'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllAcademicPublicationsController implements IController {
  constructor(
    @inject(GetAllAcademicPublicationsUseCase)
    private readonly useCase: GetAllAcademicPublicationsUseCase,

    @inject(AcademicPublicationFilteredPresenter)
    private readonly academicPublicationFilteredPresenter: AcademicPublicationFilteredPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllAcademicPublicationsQueryType }>, reply: FastifyReply) {
    const { data, meta } = await this.useCase.execute(request.query)

    const formattedReply = this.academicPublicationFilteredPresenter.toHTTP(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
