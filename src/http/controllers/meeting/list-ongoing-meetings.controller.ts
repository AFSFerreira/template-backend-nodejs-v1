import { MeetingPresenter } from '@presenters/meeting-presenter'
import { listOngoingMeetingsQuerySchema } from '@schemas/meeting/list-ongoing-meetings-query-schema'
import { makeListOngoingMeetingsUseCase } from '@use-cases/factories/meeting/make-list-ongoing-meetings-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listOngoingMeetingsController(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = listOngoingMeetingsQuerySchema.parse(request.query)
  const listOngoingMeetingsUseCase = makeListOngoingMeetingsUseCase()

  const { data, meta } = await listOngoingMeetingsUseCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: MeetingPresenter.toHTTPOngoing(data),
    meta
  })
}
