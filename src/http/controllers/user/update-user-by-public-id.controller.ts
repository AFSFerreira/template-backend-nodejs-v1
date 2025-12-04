import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { makeUpdateUserUseCase } from '@factories/user/make-update-user-use-case'
import { UserPresenter } from '@presenters/user-presenter'
import { updateUserByPublicIdBodySchema } from '@schemas/user/update-user-by-public-id-body-schema'
import { updateUserByPublicIdParamsSchema } from '@schemas/user/update-user-by-public-id-params-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateUserByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateUserByPublicIdParamsSchema.parse(request.params)
  const parsedBody = updateUserByPublicIdBodySchema.parse(request.body)

  const useCase = makeUpdateUserUseCase()

  const { user } = await useCase.execute({
    publicId,
    data: parsedBody,
  })

  return await reply.status(200).send({ data: UserPresenter.toHTTP(user, USER_DETAILED_PRESENTER_KEY) })
}
