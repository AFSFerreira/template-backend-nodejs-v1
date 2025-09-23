import { UserPresenter } from '@presenters/user-presenter'
import { getAllUsersSimplifiedQuerySchema } from '@schemas/user/get-all-users-simplified-query-schema'
import { makeGetAllUsersSimplifiedUseCase } from '@use-cases/factories/user/make-get-all-users-simplified-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllUsersSimplified(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllUsersSimplifiedQuerySchema.parse(request.query)
  const getAllUsersUseCase = makeGetAllUsersSimplifiedUseCase()

  const { data, meta } = await getAllUsersUseCase.execute(parsedQuery)

  return await reply.status(200).send({ data: UserPresenter.toHTTPSimplified(data), meta })
}
