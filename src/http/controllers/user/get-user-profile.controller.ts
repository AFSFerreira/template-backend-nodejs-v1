import type { HTTPUserWithDetails } from '@custom-types/presenter/user/user-detailed'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { UserPresenter } from '@presenters/variants/user-presenter'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { GetUserProfileUseCase } from '@use-cases/user/get-user-profile'
import { container } from 'tsyringe'

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))

  const useCase = container.resolve(GetUserProfileUseCase)

  const { user } = await useCase.execute({ publicId })

  return await reply.status(200).send({
    data: UserPresenter.toHTTP<UserWithDetails, HTTPUserWithDetails>(user, USER_DETAILED_PRESENTER_KEY),
  })
}
