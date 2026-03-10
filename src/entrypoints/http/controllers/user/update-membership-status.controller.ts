import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateMembershipStatusBodyType } from '@custom-types/http/schemas/user/update-membership-status-body-schema'
import type { UpdateMembershipStatusParamsType } from '@custom-types/http/schemas/user/update-membership-status-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UpdateMembershipStatusUseCase } from '@use-cases/user/update-membership-status'
import type { FastifyReply } from 'fastify'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class UpdateMembershipStatusController implements IController {
  constructor(private useCase: UpdateMembershipStatusUseCase) {}

  async handle(
    request: ZodRequest<{ body: UpdateMembershipStatusBodyType; params: UpdateMembershipStatusParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const parsedBody = request.body
    const { user } = await this.useCase.execute({
      ...parsedBody,
      publicId,
      audit: {
        actorPublicId: getRequestUserPublicId(request),
        ipAddress: getClientIp(request),
      },
    })

    const formattedReply = UserDefaultPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
