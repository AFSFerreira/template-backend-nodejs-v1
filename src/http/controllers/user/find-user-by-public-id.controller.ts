import type {
  HTTPUserWithDetailsForAdmin,
  UserDetailedPresenterForAdminInput,
} from '@custom-types/http/presenter/user/user-detailed-for-admin'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { UserPresenter } from '@presenters/user-presenter'
import { findUserByPublicIdParamsSchema } from '@schemas/user/find-by-public-id-params-schema'
import { FindUserByPublicIdUseCase } from '@use-cases/user/find-by-public-id'
import { container } from 'tsyringe'

export async function findUserByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findUserByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(FindUserByPublicIdUseCase)

  const { user } = await useCase.execute({ publicId })

  const formattedReply = UserPresenter.toHTTP<UserDetailedPresenterForAdminInput, HTTPUserWithDetailsForAdmin>(
    user,
    tokens.presenters.user.userDetailedForAdmin,
  )

  return await reply.status(200).send({ data: formattedReply })
}
