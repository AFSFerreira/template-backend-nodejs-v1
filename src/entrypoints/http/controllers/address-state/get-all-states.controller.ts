import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllStatesQueryType } from '@custom-types/http/schemas/address/get-all-states-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { AddressWithUsersCountPresenter } from '@http/presenters/address/address-with-users-count.presenter'
import { GetAllStatesUseCase } from '@use-cases/address-state/get-all-states'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllStatesController implements IController {
  constructor(
    @inject(GetAllStatesUseCase)
    private readonly useCase: GetAllStatesUseCase,

    @inject(AddressWithUsersCountPresenter)
    private readonly addressWithUsersCountPresenter: AddressWithUsersCountPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllStatesQueryType }>, reply: FastifyReply) {
    const { data, meta } = await this.useCase.execute(request.query)

    const formattedReply = this.addressWithUsersCountPresenter.toHTTP(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
