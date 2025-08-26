import { UserPresenter } from '@presenters/user-presenter'
import { getAllUsersQuerySchema } from '@schemas/user/get-all-users-query-schema'
import { makeGetAllUsersUseCase } from '@use-cases/factories/user/make-get-all-users-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsedQuery = getAllUsersQuerySchema.parse(request.query)
  const getAllUsersUseCase = makeGetAllUsersUseCase()

  const { data, meta } = await getAllUsersUseCase.execute(parsedQuery)

  return await reply
    .status(200)
    .send({ data: UserPresenter.toHTTP(data), meta })
}
