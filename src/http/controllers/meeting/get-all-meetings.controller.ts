import { MEETING_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { MeetingPresenter } from '@presenters/meeting-presenter'
import { getAllMeetingsQuerySchema } from '@schemas/meeting/get-all-meetings-query-schema'
import { makeGetAllMeetingsUseCase } from '@use-cases/factories/meeting/make-get-all-meetings-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllMeetings(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllMeetingsQuerySchema.parse(request.query)

  const useCase = makeGetAllMeetingsUseCase()

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: MeetingPresenter.toHTTP(data, MEETING_DETAILED_PRESENTER_KEY),
    meta,
  })
}
