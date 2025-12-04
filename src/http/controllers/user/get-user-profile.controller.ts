import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { UserPresenter } from '@presenters/user-presenter'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { makeGetUserProfileUseCase } from '@use-cases/factories/user/make-get-user-profile-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(request.user.sub)
  const useCase = makeGetUserProfileUseCase()

  const { user } = await useCase.execute({
    publicId,
  })

  return await reply.status(200).send({
    data: UserPresenter.toHTTP(user, USER_DETAILED_PRESENTER_KEY),
  })
}
