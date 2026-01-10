import type { HTTPMeetingWithDetails } from '@custom-types/presenter/meeting/meeting-detailed'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MeetingPresenter } from '@presenters/meeting-presenter'
import { updateMeetingBodySchema } from '@schemas/meeting/update-meeting-body-schema'
import { updateMeetingParamsSchema } from '@schemas/meeting/update-meeting-params-schema'
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

  const formattedReply = MeetingPresenter.toHTTP<MeetingWithDetails, HTTPMeetingWithDetails>(
    meeting,
    tokens.presenters.meeting.meetingDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
