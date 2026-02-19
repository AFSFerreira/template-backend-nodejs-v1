import type { HTTPUserWithDetails, UserDetailedPresenterInput } from '@custom-types/http/presenter/user/user-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { UserPresenter } from '@presenters/user-presenter'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { GetUserProfileUseCase } from '@use-cases/user/get-user-profile'
import { container } from 'tsyringe'

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))

  const useCase = container.resolve(GetUserProfileUseCase)

  const { user } = await useCase.execute({ publicId })

  const formattedReply = UserPresenter.toHTTP<UserDetailedPresenterInput, HTTPUserWithDetails>(
    user,
    tsyringeTokens.presenters.user.userDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
