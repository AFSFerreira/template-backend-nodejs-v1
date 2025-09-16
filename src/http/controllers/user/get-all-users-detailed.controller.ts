import { UserPresenter } from '@presenters/user-presenter'
import { getAllUsersDetailedQuerySchema } from '@schemas/user/get-all-users-detailed-query-schema'
import { makeGetAllUsersDetailedUseCase } from '@use-cases/factories/user/make-get-all-users-detailed-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllUsersDetailed(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllUsersDetailedQuerySchema.parse(request.query)
  const GetAllUsersDetailedUseCase = makeGetAllUsersDetailedUseCase()

  const { data, meta } = await GetAllUsersDetailedUseCase.execute(parsedQuery)

  return await reply.status(200).send({ data: UserPresenter.toHTTPSimplified(data), meta })
}
