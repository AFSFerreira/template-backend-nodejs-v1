import { USER_SIMPLIFIED_PRESENTER_KEY } from '@constants/presenters-constants'
import { UserPresenter } from '@presenters/user-presenter'
import { getAllUsersDetailedQuerySchema } from '@schemas/user/get-all-users-detailed-query-schema'
import { GetAllUsersDetailedUseCase } from '@use-cases/user/get-all-users-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function getAllUsersDetailed(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllUsersDetailedQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllUsersDetailedUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({ data: UserPresenter.toHTTP(data, USER_SIMPLIFIED_PRESENTER_KEY), meta })
}
