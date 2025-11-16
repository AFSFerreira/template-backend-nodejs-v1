import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { UserPresenter } from '@presenters/user-presenter'
import { updateBodySchema } from '@schemas/user/update-user-body-schema'
import { makeUpdateUserUseCase } from '@use-cases/factories/user/make-update-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const { sub: userId } = request.user
  const parsedBody = updateBodySchema.parse(request.body)

  const updateUserUseCase = makeUpdateUserUseCase()
  const { user } = await updateUserUseCase.execute({
    userId,
    data: parsedBody,
  })

  return await reply.status(200).send({
    data: UserPresenter.toHTTP(user, USER_DETAILED_PRESENTER_KEY),
  })
}
