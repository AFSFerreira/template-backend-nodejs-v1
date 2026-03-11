import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateMembershipStatusBodyType } from '@custom-types/http/schemas/user/update-membership-status-body-schema'
import type { UpdateMembershipStatusParamsType } from '@custom-types/http/schemas/user/update-membership-status-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserDetailedPresenter } from '@http/presenters/user/user-detailed.presenter'
import { UpdateMembershipStatusUseCase } from '@use-cases/user/update-membership-status'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateMembershipStatusController implements IController {
  constructor(
    @inject(UpdateMembershipStatusUseCase)
    private readonly useCase: UpdateMembershipStatusUseCase,

    @inject(UserDetailedPresenter)
    private readonly userDetailedPresenter: UserDetailedPresenter,
  ) {}

  async handle(
    request: ZodRequest<{ body: UpdateMembershipStatusBodyType; params: UpdateMembershipStatusParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const { user } = await this.useCase.execute({
      ...request.body,
      publicId,
      audit: {
        actorPublicId: getRequestUserPublicId(request),
        ipAddress: getClientIp(request),
      },
    })

    const formattedReply = this.userDetailedPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
