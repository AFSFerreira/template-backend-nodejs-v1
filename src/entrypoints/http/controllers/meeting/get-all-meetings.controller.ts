import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPMeetingWithDetails,
  MeetingDetailedPresenterInput,
} from '@custom-types/http/presenter/meeting/meeting-detailed'
import type { GetAllMeetingsQueryType } from '@custom-types/http/schemas/meeting/get-all-meetings-query-schema'
import type { FastifyReply } from 'fastify'
import { MeetingPresenter } from '@http/presenters/meeting-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllMeetingsUseCase } from '@use-cases/meeting/get-all-meetings'
import { container } from 'tsyringe'

export async function getAllMeetings(
  request: ZodRequest<{ querystring: GetAllMeetingsQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllMeetingsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = MeetingPresenter.toHTTP<MeetingDetailedPresenterInput, HTTPMeetingWithDetails>(
    data,
    tsyringeTokens.presenters.meeting.meetingDetailed,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
