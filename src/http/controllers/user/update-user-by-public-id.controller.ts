import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import type { UpdateUserBodySchemaType } from '@custom-types/schemas/user/update-user-body-schema'
import { UserPresenter } from '@presenters/user-presenter'
import { updateUserByPublicIdBodySchema } from '@schemas/user/update-user-by-public-id-body-schema'
import { updateUserByPublicIdParamsSchema } from '@schemas/user/update-user-by-public-id-params-schema'
import { UpdateUserUseCase } from '@use-cases/user/update-user'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function updateUserByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateUserByPublicIdParamsSchema.parse(request.params)
  const parsedBody = updateUserByPublicIdBodySchema.parse(request.body) as UpdateUserBodySchemaType

  const useCase = container.resolve(UpdateUserUseCase)

  const { user } = await useCase.execute({
    publicId,
    data: parsedBody,
  })

  return await reply.status(200).send({ data: UserPresenter.toHTTP(user, USER_DETAILED_PRESENTER_KEY) })
}
