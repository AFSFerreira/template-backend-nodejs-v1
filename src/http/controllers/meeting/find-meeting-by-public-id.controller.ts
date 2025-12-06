import { MEETING_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { MeetingPresenter } from '@presenters/meeting-presenter'
import { findUserByPublicIdParamsSchema } from '@schemas/user/find-by-public-id-params-schema'
import { FindMeetingByPublicIdUseCase } from '@use-cases/meeting/find-by-public-id'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function findMeetingByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findUserByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(FindMeetingByPublicIdUseCase)

  const { meeting } = await useCase.execute({ publicId })

  return await reply.status(200).send({
    data: MeetingPresenter.toHTTP(meeting, MEETING_DETAILED_PRESENTER_KEY),
  })
}
