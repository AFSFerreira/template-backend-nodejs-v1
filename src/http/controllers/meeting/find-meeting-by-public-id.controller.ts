import type { HTTPMeetingWithDetails } from '@custom-types/presenter/meeting/meeting-detailed'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MeetingPresenter } from '@presenters/meeting-presenter'
import { findUserByPublicIdParamsSchema } from '@schemas/user/find-by-public-id-params-schema'
import { FindMeetingByPublicIdUseCase } from '@use-cases/meeting/find-by-public-id'
import { container } from 'tsyringe'

export async function findMeetingByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findUserByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(FindMeetingByPublicIdUseCase)

  const { meeting } = await useCase.execute({ publicId })

  const formattedReply = MeetingPresenter.toHTTP<MeetingWithDetails, HTTPMeetingWithDetails>(
    meeting,
    tokens.presenters.meeting.meetingDetailed,
  )

  return await reply.status(200).send({ data: formattedReply })
}
