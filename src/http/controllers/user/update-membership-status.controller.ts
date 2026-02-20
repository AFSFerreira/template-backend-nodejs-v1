import type { HTTPUserWithDetails, UserDetailedPresenterInput } from '@custom-types/http/presenter/user/user-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UserPresenter } from '@presenters/user-presenter'
import { updateMembershipStatusBodySchema } from '@schemas/user/update-membership-status-body-schema'
import { updateMembershipStatusParamsSchema } from '@schemas/user/update-membership-status-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { UpdateMembershipStatusUseCase } from '@use-cases/user/update-membership-status'
import { getClientIp } from '@utils/http/get-client-ip'
import { container } from 'tsyringe'

export async function updateMembershipStatus(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateMembershipStatusParamsSchema.parse(request.params)
  const parsedBody = updateMembershipStatusBodySchema.parse(request.body)

  const useCase = container.resolve(UpdateMembershipStatusUseCase)

  const { user } = await useCase.execute({
    ...parsedBody,
    publicId,
    audit: {
      actorPublicId: getRequestUserPublicId(request),
      ipAddress: getClientIp(request),
    },
  })

  const formattedReply = UserPresenter.toHTTP<UserDetailedPresenterInput, HTTPUserWithDetails>(
    user,
    tsyringeTokens.presenters.user.userDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
