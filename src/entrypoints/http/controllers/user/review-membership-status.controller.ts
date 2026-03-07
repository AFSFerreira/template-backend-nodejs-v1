import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { HTTPUserWithDetails, UserDetailedPresenterInput } from '@custom-types/http/presenter/user/user-detailed'
import type { ReviewMembershipStatusBodyType } from '@custom-types/http/schemas/user/review-membership-status-body-schema'
import type { ReviewMembershipStatusParamsType } from '@custom-types/http/schemas/user/review-membership-status-params-schema'
import type { FastifyReply } from 'fastify'
import { UserPresenter } from '@http/presenters/user-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { ReviewMembershipStatusUseCase } from '@use-cases/user/review-membership-status'
import { getClientIp } from '@utils/http/get-client-ip'
import { container } from 'tsyringe'

export async function reviewMembershipStatus(
  request: ZodRequest<{ body: ReviewMembershipStatusBodyType; params: ReviewMembershipStatusParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(ReviewMembershipStatusUseCase)

  const { user } = await useCase.execute({
    ...request.body,
    publicId,
    audit: {
      actorPublicId: getRequestUserPublicId(request),
      ipAddress: getClientIp(request),
    },
  })

  const formattedReply = UserPresenter.toHTTP<UserDetailedPresenterInput, HTTPUserWithDetails>(
    user,
    tsyringeTokens.presenters.user.userDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
