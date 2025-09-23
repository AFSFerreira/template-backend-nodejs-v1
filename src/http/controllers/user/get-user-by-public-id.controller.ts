import { UserPresenter } from '@presenters/user-presenter'
import { findUserByPublicIdParamsSchema } from '@schemas/user/find-by-public-id-params-schema'
import { makeFindUserByPublicIdUseCase } from '@use-cases/factories/user/make-find-by-public-id-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getUserByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findUserByPublicIdParamsSchema.parse(request.params)
  const findUserByIdUseCase = makeFindUserByPublicIdUseCase()

  const { user } = await findUserByIdUseCase.execute({ publicId })
  return await reply.status(200).send({ user: UserPresenter.toHTTPDetailed(user) })
}
