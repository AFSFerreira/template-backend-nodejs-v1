import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { UserPresenter } from '@presenters/user-presenter'
import { reviewMembershipStatusBodySchema } from '@schemas/user/review-membership-status-body-schema'
import { reviewMembershipStatusParamsSchema } from '@schemas/user/review-membership-status-params-schema'
import { ReviewMembershipStatusUseCase } from '@use-cases/user/review-membership-status'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function reviewMembershipStatus(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = reviewMembershipStatusParamsSchema.parse(request.params)
  const parsedBody = reviewMembershipStatusBodySchema.parse(request.body)

  const useCase = container.resolve(ReviewMembershipStatusUseCase)

  const { user } = await useCase.execute({
    ...parsedBody,
    publicId,
  })

  return await reply.status(200).send({ data: UserPresenter.toHTTP(user, USER_DETAILED_PRESENTER_KEY) })
}
