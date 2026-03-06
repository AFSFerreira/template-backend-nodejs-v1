import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { HTTPUserWithDetails, UserDetailedPresenterInput } from '@custom-types/http/presenter/user/user-detailed'
import type { UpdateBodyType, UpdateUserBodySchemaType } from '@custom-types/http/schemas/user/update-user-body-schema'
import type { FastifyReply } from 'fastify'
import { UserPresenter } from '@http/presenters/user-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { UpdateUserUseCase } from '@use-cases/user/update-user'
import { container } from 'tsyringe'

export async function updateUser(request: ZodRequest<{ body: UpdateBodyType }>, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
  const parsedBody = request.body as UpdateUserBodySchemaType

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
