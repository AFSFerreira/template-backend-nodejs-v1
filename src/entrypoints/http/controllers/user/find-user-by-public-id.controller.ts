import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindUserByIdParamsType } from '@custom-types/entrypoints/http/schemas/user/find-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { FindUserByIdUseCase } from '@use-cases/user/find-by-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class FindUserByIdController implements IController {
  constructor(
    @inject(FindUserByIdUseCase)
    private readonly useCase: FindUserByIdUseCase,

    @inject(UserDefaultPresenter)
    private readonly userDefaultPresenter: UserDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: FindUserByIdParamsType }>, reply: FastifyReply) {
    const { id } = request.params
    const { user } = await this.useCase.execute({ id })

    const formattedReply = this.userDefaultPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
