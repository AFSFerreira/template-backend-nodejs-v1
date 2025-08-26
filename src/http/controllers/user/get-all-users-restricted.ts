import { UserPresenter } from '@presenters/user-presenter'
import { getAllUsersRestrictedQuerySchema } from '@schemas/user/get-all-users-restricted-query-schema'
import { makeGetAllUsersRestrictedUseCase } from '@use-cases/factories/user/make-get-all-users-restricted-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllUsersRestricted(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsedQuery = getAllUsersRestrictedQuerySchema.parse(request.query)
  const getAllUsersRestrictedUseCase = makeGetAllUsersRestrictedUseCase()

  const { data, meta } = await getAllUsersRestrictedUseCase.execute(parsedQuery)
  return await reply
    .status(200)
    .send({ data: UserPresenter.toHTTPRestricted(data), meta })
}
