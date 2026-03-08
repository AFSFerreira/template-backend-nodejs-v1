import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPSimplifiedUserDetailsForAdmin,
  UserSimplifiedForAdminPresenterInput,
} from '@custom-types/http/presenter/user/user-simplified-for-admin'
import type { GetAllUsersDetailedQueryType } from '@custom-types/http/schemas/user/get-all-users-detailed-query-schema'
import type { FastifyReply } from 'fastify'
import { UserPresenter } from '@http/presenters/user-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllUsersDetailedUseCase } from '@use-cases/user/get-all-users-detailed'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getAllUsersDetailed(
  request: ZodRequest<{ querystring: GetAllUsersDetailedQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllUsersDetailedUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = UserPresenter.toHTTP<UserSimplifiedForAdminPresenterInput, HTTPSimplifiedUserDetailsForAdmin>(
    data,
    tsyringeTokens.presenters.user.userSimplifiedForAdmin,
  )

  return await reply.status(StatusCodes.OK).send({ data: formattedReply, meta })
}
