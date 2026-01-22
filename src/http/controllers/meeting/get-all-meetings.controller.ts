import type {
  HTTPMeetingWithDetails,
  MeetingDetailedPresenterInput,
} from '@custom-types/http/presenter/meeting/meeting-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MeetingPresenter } from '@presenters/meeting-presenter'
import { getAllMeetingsQuerySchema } from '@schemas/meeting/get-all-meetings-query-schema'
import { GetAllMeetingsUseCase } from '@use-cases/meeting/get-all-meetings'
import { container } from 'tsyringe'

export async function getAllMeetings(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllMeetingsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllMeetingsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = MeetingPresenter.toHTTP<MeetingDetailedPresenterInput, HTTPMeetingWithDetails>(
    data,
    tokens.presenters.meeting.meetingDetailed,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
