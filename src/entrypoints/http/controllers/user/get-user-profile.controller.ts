import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { GetUserProfileUseCase } from '@use-cases/user/get-user-profile'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetUserProfileController implements IController {
  constructor(
    @inject(GetUserProfileUseCase)
    private readonly useCase: GetUserProfileUseCase,

    @inject(UserDefaultPresenter)
    private readonly userDefaultPresenter: UserDefaultPresenter,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
    const { user } = await this.useCase.execute({ publicId })

    const formattedReply = this.userDefaultPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
