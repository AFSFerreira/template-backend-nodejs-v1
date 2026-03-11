import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetMeetingEnrollmentParamsType } from '@custom-types/http/schemas/meeting-enrollment/get-meeting-enrollment-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { MeetingEnrollmentDetailedWithPresentationPresenter } from '@http/presenters/meeting-enrollment/meeting-enrollment-detailed-with-presentation.presenter'
import { GetMeetingEnrollmentUseCase } from '@use-cases/meeting-enrollment/get-meeting-enrollment'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetMeetingEnrollmentController implements IController {
  constructor(
    @inject(GetMeetingEnrollmentUseCase)
    private readonly useCase: GetMeetingEnrollmentUseCase,

    @inject(MeetingEnrollmentDetailedWithPresentationPresenter)
    private readonly meetingEnrollmentDetailedWithPresentationPresenter: MeetingEnrollmentDetailedWithPresentationPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: GetMeetingEnrollmentParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params

    const { enrollment } = await this.useCase.execute({ publicId })

    const formattedReply = this.meetingEnrollmentDetailedWithPresentationPresenter.toHTTP(enrollment)

    return await reply.sendResponse(formattedReply)
  }
}
