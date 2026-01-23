import type { HTTPUserWithDetails, UserDetailedPresenterInput } from '@custom-types/http/presenter/user/user-detailed'
import type { UpdateUserBodySchemaType } from '@custom-types/http/schemas/user/update-user-body-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UserPresenter } from '@presenters/user-presenter'
import { updateUserByPublicIdBodySchema } from '@schemas/user/update-user-by-public-id-body-schema'
import { updateUserByPublicIdParamsSchema } from '@schemas/user/update-user-by-public-id-params-schema'
import { UpdateUserUseCase } from '@use-cases/user/update-user'
import { container } from 'tsyringe'

export async function updateUserByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateUserByPublicIdParamsSchema.parse(request.params)
  const parsedBody = updateUserByPublicIdBodySchema.parse(request.body) as UpdateUserBodySchemaType

  const useCase = container.resolve(UpdateUserUseCase)

  const { user } = await useCase.execute({
    publicId,
    data: parsedBody,
  })

  const formattedReply = UserPresenter.toHTTP<UserDetailedPresenterInput, HTTPUserWithDetails>(
    user,
    tsyringeTokens.presenters.user.userDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
