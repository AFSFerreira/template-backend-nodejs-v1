import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import type { UpdateUserBodySchemaType } from '@custom-types/schemas/user/update-user-body-schema'
import { UserPresenter } from '@presenters/user-presenter'
import { updateBodySchema } from '@schemas/user/update-user-body-schema'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { makeUpdateUserUseCase } from '@use-cases/factories/user/make-update-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(request.user.sub)
  const parsedBody = updateBodySchema.parse(request.body) as UpdateUserBodySchemaType

  const useCase = makeUpdateUserUseCase()
  const { user } = await useCase.execute({
    publicId,
    data: parsedBody,
  })

  return await reply.status(200).send({
    data: UserPresenter.toHTTP(user, USER_DETAILED_PRESENTER_KEY),
  })
}
