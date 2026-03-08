import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { HTTPUserWithDetails, UserDetailedPresenterInput } from '@custom-types/http/presenter/user/user-detailed'
import type { UpdateMembershipStatusBodyType } from '@custom-types/http/schemas/user/update-membership-status-body-schema'
import type { UpdateMembershipStatusParamsType } from '@custom-types/http/schemas/user/update-membership-status-params-schema'
import type { FastifyReply } from 'fastify'
import { UserPresenter } from '@http/presenters/user-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { UpdateMembershipStatusUseCase } from '@use-cases/user/update-membership-status'
import { getClientIp } from '@utils/http/get-client-ip'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function updateMembershipStatus(
  request: ZodRequest<{ body: UpdateMembershipStatusBodyType; params: UpdateMembershipStatusParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params
  const parsedBody = request.body

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

  return await reply.status(StatusCodes.OK).send({ data: formattedReply })
}
