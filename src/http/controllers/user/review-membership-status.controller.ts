import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { makeReviewMembershipStatusUseCase } from '@factories/user/make-review-membership-status-use-case'
import { UserPresenter } from '@presenters/user-presenter'
import { reviewMembershipStatusBodySchema } from '@schemas/user/review-membership-status-body-schema'
import { reviewMembershipStatusParamsSchema } from '@schemas/user/review-membership-status-params-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function reviewMembershipStatus(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = reviewMembershipStatusParamsSchema.parse(request.params)
  const parsedBody = reviewMembershipStatusBodySchema.parse(request.body)

  const useCase = makeReviewMembershipStatusUseCase()

  const { user } = await useCase.execute({
    ...parsedBody,
    publicId,
  })

  return await reply.status(200).send({ data: UserPresenter.toHTTP(user, USER_DETAILED_PRESENTER_KEY) })
}
