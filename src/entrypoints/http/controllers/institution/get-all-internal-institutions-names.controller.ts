import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllInternalInstitutionsNamesQueryType } from '@custom-types/http/schemas/institution/get-all-internal-institutions-names-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllInternalInstitutionsNamesUseCase } from '@use-cases/institution/get-all-internal-institutions-names'
import type { FastifyReply } from 'fastify'
import { InstitutionDefaultPresenter } from '@http/presenters/institution/institution-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllInternalInstitutionsNamesController implements IController {
  constructor(private useCase: GetAllInternalInstitutionsNamesUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllInternalInstitutionsNamesQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = InstitutionDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
