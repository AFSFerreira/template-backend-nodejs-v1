import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserDetailedPresenter } from '@http/presenters/user/user-detailed.presenter'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { GetUserProfileUseCase } from '@use-cases/user/get-user-profile'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetUserProfileController implements IController {
  constructor(
    @inject(GetUserProfileUseCase)
    private readonly useCase: GetUserProfileUseCase,

    @inject(UserDetailedPresenter)
    private readonly userDetailedPresenter: UserDetailedPresenter,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
    const { user } = await this.useCase.execute({ publicId })

    const formattedReply = this.userDetailedPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
