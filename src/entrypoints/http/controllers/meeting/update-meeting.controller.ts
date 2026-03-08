import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPMeetingWithDetails,
  MeetingDetailedPresenterInput,
} from '@custom-types/http/presenter/meeting/meeting-detailed'
import type { UpdateMeetingBodyType } from '@custom-types/http/schemas/meeting/update-meeting-body-schema'
import type { UpdateMeetingParamsType } from '@custom-types/http/schemas/meeting/update-meeting-params-schema'
import type { FastifyReply } from 'fastify'
import { MeetingPresenter } from '@http/presenters/meeting-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UpdateMeetingUseCase } from '@use-cases/meeting/update-meeting'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function updateMeeting(
  request: ZodRequest<{ body: UpdateMeetingBodyType; params: UpdateMeetingParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params
  const parsedBody = request.body

  const useCase = container.resolve(UpdateMeetingUseCase)

  const { meeting } = await useCase.execute({
    publicId,
    body: parsedBody,
  })

  const formattedReply = MeetingPresenter.toHTTP<MeetingDetailedPresenterInput, HTTPMeetingWithDetails>(
    meeting,
    tsyringeTokens.presenters.meeting.meetingDetailed,
  )

  return await reply.status(StatusCodes.OK).send({ data: formattedReply })
}
