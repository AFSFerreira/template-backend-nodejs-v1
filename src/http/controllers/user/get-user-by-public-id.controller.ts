import type { HTTPUserWithDetailsForAdmin } from '@custom-types/presenter/user/user-detailed-for-admin'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { USER_DETAILED_FOR_ADMIN_PRESENTER_KEY } from '@constants/presenters-constants'
import { UserPresenter } from '@presenters/variants/user-presenter'
import { findUserByPublicIdParamsSchema } from '@schemas/user/find-by-public-id-params-schema'
import { FindUserByPublicIdUseCase } from '@use-cases/user/find-by-public-id'
import { container } from 'tsyringe'

export async function getUserByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findUserByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(FindUserByPublicIdUseCase)

  const { user } = await useCase.execute({ publicId })

  return await reply.status(200).send({
    data: UserPresenter.toHTTP<UserWithDetails, HTTPUserWithDetailsForAdmin>(
      user,
      USER_DETAILED_FOR_ADMIN_PRESENTER_KEY,
    ),
  })
}
