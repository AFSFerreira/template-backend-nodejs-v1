import type { HTTPUserWithDetails, UserDetailedPresenterInput } from '@custom-types/http/presenter/user/user-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UserPresenter } from '@presenters/user-presenter'
import { reviewMembershipStatusBodySchema } from '@schemas/user/review-membership-status-body-schema'
import { reviewMembershipStatusParamsSchema } from '@schemas/user/review-membership-status-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { ReviewMembershipStatusUseCase } from '@use-cases/user/review-membership-status'
import { getClientIp } from '@utils/http/get-client-ip'
import { container } from 'tsyringe'

export async function reviewMembershipStatus(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = reviewMembershipStatusParamsSchema.parse(request.params)
  const parsedBody = reviewMembershipStatusBodySchema.parse(request.body)

  const useCase = container.resolve(ReviewMembershipStatusUseCase)

  const { user } = await useCase.execute({
    ...parsedBody,
    publicId,
    audit: {
      actorPublicId: getRequestUserPublicId(request),
      ipAddress: getClientIp(request),
    },
  })

  const formattedReply = user
    ? UserPresenter.toHTTP<UserDetailedPresenterInput, HTTPUserWithDetails>(
        user,
        tsyringeTokens.presenters.user.userDetailed,
      )
    : undefined

  return await reply.status(200).send({ data: formattedReply })
}
