import type { HTTPMeetingWithDetails } from '@custom-types/presenter/meeting/meeting-detailed'
import type { MeetingWithDetails } from '@custom-types/validator/meeting-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { MEETING_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { MeetingPresenter } from '@presenters/variants/meeting-presenter'
import { getAllMeetingsQuerySchema } from '@schemas/meeting/get-all-meetings-query-schema'
import { GetAllMeetingsUseCase } from '@use-cases/meeting/get-all-meetings'
import { container } from 'tsyringe'

export async function getAllMeetings(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllMeetingsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllMeetingsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: MeetingPresenter.toHTTP<MeetingWithDetails, HTTPMeetingWithDetails>(data, MEETING_DETAILED_PRESENTER_KEY),
    meta,
  })
}
