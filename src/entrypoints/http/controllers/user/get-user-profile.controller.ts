import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserDetailedPresenter } from '@http/presenters/user/user-detailed.presenter'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { GetUserProfileUseCase } from '@use-cases/user/get-user-profile'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetUserProfileController implements IController {
  constructor(
    @inject(GetUserProfileUseCase)
    private readonly useCase: GetUserProfileUseCase,

    @inject(UserDetailedPresenter)
    private readonly userDetailedPresenter: UserDetailedPresenter,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { user } = await this.useCase.execute({
      publicId: modelPublicIdSchema.parse(getRequestUserPublicId(request)),
    })

    const formattedReply = this.userDetailedPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
