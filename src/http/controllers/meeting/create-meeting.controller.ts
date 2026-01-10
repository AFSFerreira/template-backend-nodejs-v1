import type { HTTPMeetingWithDetails } from '@custom-types/presenter/meeting/meeting-detailed'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MeetingPresenter } from '@presenters/variants/meeting-presenter'
import { createMeetingBodySchema } from '@schemas/meeting/create-meeting-body-schema'
import { CreateMeetingUseCase } from '@use-cases/meeting/create-meeting'
import { container } from 'tsyringe'

export async function createMeeting(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = createMeetingBodySchema.parse(request.body)

  const useCase = container.resolve(CreateMeetingUseCase)

  const { meeting } = await useCase.execute(parsedBody)

  const formattedReply = MeetingPresenter.toHTTP<MeetingWithDetails, HTTPMeetingWithDetails>(
    meeting,
    tokens.presenters.meeting.meetingDetailed,
  )

  return await reply.status(201).send({ data: formattedReply })
}
