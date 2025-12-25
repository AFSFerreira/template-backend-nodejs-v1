import type { HTTPUserWithDetails } from '@custom-types/presenter/user/user-detailed'
import type { UpdateUserBodySchemaType } from '@custom-types/schemas/user/update-user-body-schema'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { UserPresenter } from '@presenters/variants/user-presenter'
import { updateBodySchema } from '@schemas/user/update-user-body-schema'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { UpdateUserUseCase } from '@use-cases/user/update-user'
import { container } from 'tsyringe'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
  const parsedBody = updateBodySchema.parse(request.body) as UpdateUserBodySchemaType

  const useCase = container.resolve(UpdateUserUseCase)

  const { user } = await useCase.execute({
    publicId,
    data: parsedBody,
  })

  return await reply.status(200).send({
    data: UserPresenter.toHTTP<UserWithDetails, HTTPUserWithDetails>(user, USER_DETAILED_PRESENTER_KEY),
  })
}
