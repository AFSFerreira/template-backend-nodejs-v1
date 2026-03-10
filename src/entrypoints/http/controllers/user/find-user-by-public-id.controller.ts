import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindUserByIdParamsType } from '@custom-types/http/schemas/user/find-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FindUserByPublicIdUseCase } from '@use-cases/user/find-by-public-id'
import type { FastifyReply } from 'fastify'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class FindUserByPublicIdController implements IController {
  constructor(private useCase: FindUserByPublicIdUseCase) {}

  async handle(request: ZodRequest<{ params: FindUserByIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { user } = await this.useCase.execute({ publicId })

    const formattedReply = UserDefaultPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
