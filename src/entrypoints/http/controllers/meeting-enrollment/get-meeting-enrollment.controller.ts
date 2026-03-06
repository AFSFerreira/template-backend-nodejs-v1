import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetMeetingEnrollmentParamsType } from '@custom-types/http/schemas/meeting-enrollment/get-meeting-enrollment-params-schema'
import type { MeetingEnrollmentDetailedWithPresentationPresenter } from '@http/presenters/meeting-enrollment/meeting-enrollment-detailed-with-presentation.presenter'
import type { FastifyReply } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetMeetingEnrollmentUseCase } from '@use-cases/meeting-enrollment/get-meeting-enrollment'
import { container } from 'tsyringe'

export async function getMeetingEnrollment(
  request: ZodRequest<{ params: GetMeetingEnrollmentParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(GetMeetingEnrollmentUseCase)
  const presenter = container.resolve<MeetingEnrollmentDetailedWithPresentationPresenter>(
    tsyringeTokens.presenters.meetingEnrollment.meetingEnrollmentDetailedWithPresentation,
  )

  const { enrollment } = await useCase.execute({ publicId })

  const formattedReply = presenter.toHTTP(enrollment)

  return await reply.status(200).send({ data: formattedReply })
}
