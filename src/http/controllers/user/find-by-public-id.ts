import { UserPresenter } from '@presenters/user-presenter'
import { findUserByPublicIdParamsSchema } from '@schemas/user/find-by-public-id-schema'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'
import { makeFindUserByPublicIdUseCase } from '@use-cases/factories/user/make-find-by-public-id-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function findByPublicUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { publicId } = findUserByPublicIdParamsSchema.parse(request.params)
  const findUserByIdUseCase = makeFindUserByPublicIdUseCase()

  try {
    const { user } = await findUserByIdUseCase.execute({ publicId })
    return await reply.status(200).send({ user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: error.message })
    }
  }
}
