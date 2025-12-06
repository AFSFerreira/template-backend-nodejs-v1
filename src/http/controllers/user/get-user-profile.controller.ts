import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { UserPresenter } from '@presenters/user-presenter'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { GetUserProfileUseCase } from '@use-cases/user/get-user-profile'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(request.user.sub)

  const useCase = container.resolve(GetUserProfileUseCase)

  const { user } = await useCase.execute({
    publicId,
  })

  return await reply.status(200).send({
    data: UserPresenter.toHTTP(user, USER_DETAILED_PRESENTER_KEY),
  })
}
