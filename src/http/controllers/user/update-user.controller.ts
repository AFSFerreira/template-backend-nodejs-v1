import type { HTTPUserWithDetails } from '@custom-types/presenter/user/user-detailed'
import type { UpdateUserBodySchemaType } from '@custom-types/schemas/user/update-user-body-schema'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
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

  const formattedReply = UserPresenter.toHTTP<UserWithDetails, HTTPUserWithDetails>(
    user,
    tokens.presenters.userDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
