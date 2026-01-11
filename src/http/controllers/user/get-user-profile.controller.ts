import type { HTTPUserWithDetails } from '@custom-types/presenter/user/user-detailed'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { UserPresenter } from '@presenters/user-presenter'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { GetUserProfileUseCase } from '@use-cases/user/get-user-profile'
import { container } from 'tsyringe'

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))

  const useCase = container.resolve(GetUserProfileUseCase)

  const { user } = await useCase.execute({ publicId })

  const formattedReply = UserPresenter.toHTTP<UserWithDetails, HTTPUserWithDetails>(
    user,
    tokens.presenters.user.userDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
