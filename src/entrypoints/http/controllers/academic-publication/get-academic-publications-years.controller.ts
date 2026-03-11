import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAcademicPublicationsYearsQueryType } from '@custom-types/http/schemas/academic-pulication/get-academic-publications-years-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { AcademicPublicationYearPresenter } from '@http/presenters/academic-publication/academic-publication-year.presenter'
import { GetAcademicPublicationsYearsUseCase } from '@use-cases/academic-publication/get-academic-publications-years'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAcademicPublicationsYearsController implements IController {
  constructor(
    @inject(GetAcademicPublicationsYearsUseCase)
    private readonly useCase: GetAcademicPublicationsYearsUseCase,

    @inject(AcademicPublicationYearPresenter)
    private readonly academicPublicationYearPresenter: AcademicPublicationYearPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAcademicPublicationsYearsQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = this.academicPublicationYearPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
