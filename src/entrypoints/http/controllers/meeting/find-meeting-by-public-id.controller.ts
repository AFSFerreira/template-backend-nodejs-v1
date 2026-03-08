import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPMeetingWithDetails,
  MeetingDetailedPresenterInput,
} from '@custom-types/http/presenter/meeting/meeting-detailed'
import type { FindUserByIdParamsType } from '@custom-types/http/schemas/user/find-by-public-id-params-schema'
import type { FastifyReply } from 'fastify'
import { MeetingPresenter } from '@http/presenters/meeting-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FindMeetingByPublicIdUseCase } from '@use-cases/meeting/find-by-public-id'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function findMeetingByPublicId(
  request: ZodRequest<{ params: FindUserByIdParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(FindMeetingByPublicIdUseCase)

  const { meeting } = await useCase.execute({ publicId })

  const formattedReply = MeetingPresenter.toHTTP<MeetingDetailedPresenterInput, HTTPMeetingWithDetails>(
    meeting,
    tsyringeTokens.presenters.meeting.meetingDetailed,
  )

  return await reply.status(StatusCodes.OK).send({ data: formattedReply })
}
