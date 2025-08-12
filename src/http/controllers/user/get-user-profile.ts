import type { FastifyReply, FastifyRequest } from 'fastify'
import { messages } from '@/constants/messages'
import { UserPresenter } from '@/http/presenters/user-presenter'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/user/make-get-user-profile-use-case'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = request
  const findUserByIdUseCase = makeGetUserProfileUseCase()

  if (userId === undefined) {
    return await reply
      .status(401)
      .send({ message: messages.errors.unauthorized })
  }

  try {
    const { user } = await findUserByIdUseCase.execute({ publicId: userId })
    return await reply.status(200).send({ user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return await reply.status(404).send({ message: error.message })
    }
  }
}
