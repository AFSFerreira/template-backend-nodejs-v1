import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ReviewMembershipStatusBodyType } from '@custom-types/http/schemas/user/review-membership-status-body-schema'
import type { ReviewMembershipStatusParamsType } from '@custom-types/http/schemas/user/review-membership-status-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { ReviewMembershipStatusUseCase } from '@use-cases/user/review-membership-status'
import type { FastifyReply } from 'fastify'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class ReviewMembershipStatusController implements IController {
  constructor(private useCase: ReviewMembershipStatusUseCase) {}

  async handle(
    request: ZodRequest<{ body: ReviewMembershipStatusBodyType; params: ReviewMembershipStatusParamsType }>,
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

    const formattedReply = UserDefaultPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
