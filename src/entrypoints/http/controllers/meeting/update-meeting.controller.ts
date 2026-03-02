import type {
  HTTPMeetingWithDetails,
  MeetingDetailedPresenterInput,
} from '@custom-types/http/presenter/meeting/meeting-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { MeetingPresenter } from '@http/presenters/meeting-presenter'
import { updateMeetingBodySchema } from '@http/schemas/meeting/update-meeting-body-schema'
import { updateMeetingParamsSchema } from '@http/schemas/meeting/update-meeting-params-schema'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UpdateMeetingUseCase } from '@use-cases/meeting/update-meeting'
import { container } from 'tsyringe'

export async function updateMeeting(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateMeetingParamsSchema.parse(request.params)
  const parsedBody = updateMeetingBodySchema.parse(request.body)

  const useCase = container.resolve(UpdateMeetingUseCase)

  const { meeting } = await useCase.execute({
    publicId,
    body: parsedBody,
  })

  const formattedReply = MeetingPresenter.toHTTP<MeetingDetailedPresenterInput, HTTPMeetingWithDetails>(
    meeting,
    tsyringeTokens.presenters.meeting.meetingDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
