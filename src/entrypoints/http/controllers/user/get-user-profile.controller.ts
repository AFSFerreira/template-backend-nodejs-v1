import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetUserProfileUseCase } from '@use-cases/user/get-user-profile'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class GetUserProfileController implements IController {
  constructor(private useCase: GetUserProfileUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
    const { user } = await this.useCase.execute({ publicId })

    const formattedReply = UserDefaultPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
