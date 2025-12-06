import { USER_SIMPLIFIED_PRESENTER_KEY } from '@constants/presenters-constants'
import { UserPresenter } from '@presenters/user-presenter'
import { getAllUsersSimplifiedQuerySchema } from '@schemas/user/get-all-users-simplified-query-schema'
import { GetAllUsersSimplifiedUseCase } from '@use-cases/user/get-all-users-simplified'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function getAllUsersSimplified(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllUsersSimplifiedQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllUsersSimplifiedUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({ data: UserPresenter.toHTTP(data, USER_SIMPLIFIED_PRESENTER_KEY), meta })
}
