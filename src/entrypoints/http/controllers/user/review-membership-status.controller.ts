import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ReviewMembershipStatusBodyType } from '@custom-types/http/schemas/user/review-membership-status-body-schema'
import type { ReviewMembershipStatusParamsType } from '@custom-types/http/schemas/user/review-membership-status-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserDetailedPresenter } from '@http/presenters/user/user-detailed.presenter'
import { ReviewMembershipStatusUseCase } from '@use-cases/user/review-membership-status'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ReviewMembershipStatusController implements IController {
  constructor(
    @inject(ReviewMembershipStatusUseCase)
    private readonly useCase: ReviewMembershipStatusUseCase,

    @inject(UserDetailedPresenter)
    private readonly userDetailedPresenter: UserDetailedPresenter,
  ) {}

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

    const formattedReply = this.userDetailedPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
