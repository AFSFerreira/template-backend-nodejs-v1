import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllInternalInstitutionsNamesQueryType } from '@custom-types/http/schemas/institution/get-all-internal-institutions-names-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { InstitutionDefaultPresenter } from '@http/presenters/institution/institution-default.presenter'
import { GetAllInternalInstitutionsNamesUseCase } from '@use-cases/institution/get-all-internal-institutions-names'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllInternalInstitutionsNamesController implements IController {
  constructor(
    @inject(GetAllInternalInstitutionsNamesUseCase)
    private readonly useCase: GetAllInternalInstitutionsNamesUseCase,

    @inject(InstitutionDefaultPresenter)
    private readonly institutionDefaultPresenter: InstitutionDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllInternalInstitutionsNamesQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = this.institutionDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
