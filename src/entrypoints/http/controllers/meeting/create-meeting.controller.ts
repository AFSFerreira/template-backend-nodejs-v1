import type {
  HTTPMeetingWithDetails,
  MeetingDetailedPresenterInput,
} from '@custom-types/http/presenter/meeting/meeting-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { MeetingPresenter } from '@http/presenters/meeting-presenter'
import { createMeetingBodySchema } from '@http/schemas/meeting/create-meeting-body-schema'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { CreateMeetingUseCase } from '@use-cases/meeting/create-meeting'
import { container } from 'tsyringe'

export async function createMeeting(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = createMeetingBodySchema.parse(request.body)

  const useCase = container.resolve(CreateMeetingUseCase)

  const { meeting } = await useCase.execute(parsedBody)

  const formattedReply = MeetingPresenter.toHTTP<MeetingDetailedPresenterInput, HTTPMeetingWithDetails>(
    meeting,
    tsyringeTokens.presenters.meeting.meetingDetailed,
  )

  return await reply.status(201).send({ data: formattedReply })
}
