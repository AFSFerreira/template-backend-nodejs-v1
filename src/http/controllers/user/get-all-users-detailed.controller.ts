import type { HTTPSimplifiedUserDetails, UserWithSimplifiedDetails } from '@custom-types/presenter/user/user-simplified'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { UserPresenter } from '@presenters/user-presenter'
import { getAllUsersDetailedQuerySchema } from '@schemas/user/get-all-users-detailed-query-schema'
import { GetAllUsersDetailedUseCase } from '@use-cases/user/get-all-users-detailed'
import { container } from 'tsyringe'

export async function getAllUsersDetailed(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllUsersDetailedQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllUsersDetailedUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = UserPresenter.toHTTP<UserWithSimplifiedDetails, HTTPSimplifiedUserDetails>(
    data,
    tokens.presenters.user.userSimplified,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
