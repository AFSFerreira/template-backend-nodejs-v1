import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPUserWithDetailsForAdmin,
  UserDetailedPresenterForAdminInput,
} from '@custom-types/http/presenter/user/user-detailed-for-admin'
import type { FindUserByIdParamsType } from '@custom-types/http/schemas/user/find-by-public-id-params-schema'
import type { FastifyReply } from 'fastify'
import { UserPresenter } from '@http/presenters/user-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FindUserByPublicIdUseCase } from '@use-cases/user/find-by-public-id'
import { container } from 'tsyringe'

export async function findUserByPublicId(request: ZodRequest<{ params: FindUserByIdParamsType }>, reply: FastifyReply) {
  const { publicId } = request.params

  const useCase = container.resolve(FindUserByPublicIdUseCase)

  const { user } = await useCase.execute({ publicId })

  const formattedReply = UserPresenter.toHTTP<UserDetailedPresenterForAdminInput, HTTPUserWithDetailsForAdmin>(
    user,
    tsyringeTokens.presenters.user.userDetailedForAdmin,
  )

  return await reply.sendResponse(formattedReply)
}
