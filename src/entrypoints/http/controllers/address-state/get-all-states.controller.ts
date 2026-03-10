import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllStatesQueryType } from '@custom-types/http/schemas/address/get-all-states-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllStatesUseCase } from '@use-cases/address-state/get-all-states'
import type { FastifyReply } from 'fastify'
import { AddressWithUsersCountPresenter } from '@http/presenters/address/address-with-users-count.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllStatesController implements IController {
  constructor(private useCase: GetAllStatesUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllStatesQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = AddressWithUsersCountPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
