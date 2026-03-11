import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindUserByIdParamsType } from '@custom-types/http/schemas/user/find-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserDetailedPresenterForAdmin } from '@http/presenters/user/user-detailed-for-admin.presenter'
import { FindUserByPublicIdUseCase } from '@use-cases/user/find-by-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class FindUserByPublicIdController implements IController {
  constructor(
    @inject(FindUserByPublicIdUseCase)
    private readonly useCase: FindUserByPublicIdUseCase,

    @inject(UserDetailedPresenterForAdmin)
    private readonly userDetailedPresenterForAdmin: UserDetailedPresenterForAdmin,
  ) {}

  async handle(request: ZodRequest<{ params: FindUserByIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { user } = await this.useCase.execute({ publicId })

    const formattedReply = this.userDetailedPresenterForAdmin.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
