import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllUsersQueryType } from '@custom-types/entrypoints/http/schemas/user/get-all-users-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserSimplifiedPresenter } from '@http/presenters/user/user-simplified.presenter'
import { GetAllUsersUseCase } from '@use-cases/user/get-all-users'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllUsersController implements IController {
  constructor(
    @inject(GetAllUsersUseCase)
    private readonly useCase: GetAllUsersUseCase,

    @inject(UserSimplifiedPresenter)
    private readonly userSimplifiedPresenter: UserSimplifiedPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllUsersQueryType }>, reply: FastifyReply) {
    const { data, meta } = await this.useCase.execute(request.query)

    const formattedReply = this.userSimplifiedPresenter.toHTTP(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
