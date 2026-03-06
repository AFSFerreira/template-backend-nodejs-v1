import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPSimplifiedUserDetails,
  UserSimplifiedPresenterInput,
} from '@custom-types/http/presenter/user/user-simplified'
import type { GetAllUsersSimplifiedQueryType } from '@custom-types/http/schemas/user/get-all-users-simplified-query-schema'
import type { FastifyReply } from 'fastify'
import { UserPresenter } from '@http/presenters/user-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllUsersSimplifiedUseCase } from '@use-cases/user/get-all-users-simplified'
import { container } from 'tsyringe'

export async function getAllUsersSimplified(
  request: ZodRequest<{ querystring: GetAllUsersSimplifiedQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllUsersSimplifiedUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = UserPresenter.toHTTP<UserSimplifiedPresenterInput, HTTPSimplifiedUserDetails>(
    data,
    tsyringeTokens.presenters.user.userSimplified,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
