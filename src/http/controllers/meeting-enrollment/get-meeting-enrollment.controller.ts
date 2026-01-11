import type { MeetingEnrollmentDetailedWithPresentationPresenter } from '@presenters/meeting-enrollment/meeting-enrollment-detailed-with-presentation.presenter'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { getMeetingEnrollmentParamsSchema } from '@schemas/meeting-enrollment/get-meeting-enrollment-params-schema'
import { GetMeetingEnrollmentUseCase } from '@use-cases/meeting-enrollment/get-meeting-enrollment'
import { container } from 'tsyringe'

export async function getMeetingEnrollment(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = getMeetingEnrollmentParamsSchema.parse(request.params)

  const useCase = container.resolve(GetMeetingEnrollmentUseCase)
  const presenter = container.resolve<MeetingEnrollmentDetailedWithPresentationPresenter>(
    tokens.presenters.meetingEnrollment.meetingEnrollmentDetailedWithPresentation,
  )

  const { enrollment } = await useCase.execute({ publicId })

  const formattedReply = presenter.toHTTP(enrollment)

  return await reply.status(200).send({ data: formattedReply })
}
