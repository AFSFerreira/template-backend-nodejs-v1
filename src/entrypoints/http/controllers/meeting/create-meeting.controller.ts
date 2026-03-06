import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPMeetingWithDetails,
  MeetingDetailedPresenterInput,
} from '@custom-types/http/presenter/meeting/meeting-detailed'
import type { CreateMeetingBodyType } from '@custom-types/http/schemas/meeting/create-meeting-body-schema'
import type { FastifyReply } from 'fastify'
import { MeetingPresenter } from '@http/presenters/meeting-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { CreateMeetingUseCase } from '@use-cases/meeting/create-meeting'
import { container } from 'tsyringe'

export async function createMeeting(request: ZodRequest<{ body: CreateMeetingBodyType }>, reply: FastifyReply) {
  const parsedBody = request.body

  const useCase = container.resolve(CreateMeetingUseCase)

  const { meeting } = await useCase.execute(parsedBody)

  const formattedReply = MeetingPresenter.toHTTP<MeetingDetailedPresenterInput, HTTPMeetingWithDetails>(
    meeting,
    tsyringeTokens.presenters.meeting.meetingDetailed,
  )

  return await reply.status(201).send({ data: formattedReply })
}
