import { UserPresenter } from '@presenters/user-presenter'
import { makeGetUserProfileUseCase } from '@use-cases/factories/user/make-get-user-profile-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const { sub: publicId } = request.user
  const findUserByIdUseCase = makeGetUserProfileUseCase()

  const { user } = await findUserByIdUseCase.execute({
    publicId,
  })

  return await reply.status(200).send({
    data: {
      user: UserPresenter.toHTTPDetailed(user),
    },
  })
}
