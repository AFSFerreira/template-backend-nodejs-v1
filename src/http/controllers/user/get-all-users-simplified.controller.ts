import type { HTTPSimplifiedUserDetails, UserWithSimplifiedDetails } from '@custom-types/presenter/user/user-simplified'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { UserPresenter } from '@presenters/variants/user-presenter'
import { getAllUsersSimplifiedQuerySchema } from '@schemas/user/get-all-users-simplified-query-schema'
import { GetAllUsersSimplifiedUseCase } from '@use-cases/user/get-all-users-simplified'
import { container } from 'tsyringe'

export async function getAllUsersSimplified(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllUsersSimplifiedQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllUsersSimplifiedUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = UserPresenter.toHTTP<UserWithSimplifiedDetails, HTTPSimplifiedUserDetails>(
    data,
    tokens.presenters.userSimplified,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
