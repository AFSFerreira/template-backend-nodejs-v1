import type {
  HTTPSimplifiedUserDetailsForAdmin,
  UserWithSimplifiedDetailsForAdmin,
} from '@custom-types/http/presenter/user/user-simplified-for-admin'
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

  const formattedReply = UserPresenter.toHTTP<UserWithSimplifiedDetailsForAdmin, HTTPSimplifiedUserDetailsForAdmin>(
    data,
    tokens.presenters.user.userSimplifiedForAdmin,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
