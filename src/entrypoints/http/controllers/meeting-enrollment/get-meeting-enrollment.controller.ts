import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetMeetingEnrollmentParamsType } from '@custom-types/http/schemas/meeting-enrollment/get-meeting-enrollment-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetMeetingEnrollmentUseCase } from '@use-cases/meeting-enrollment/get-meeting-enrollment'
import type { FastifyReply } from 'fastify'
import { MeetingEnrollmentDetailedWithPresentationPresenter } from '@http/presenters/meeting-enrollment/meeting-enrollment-detailed-with-presentation.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetMeetingEnrollmentController implements IController {
  constructor(private useCase: GetMeetingEnrollmentUseCase) {}

  async handle(request: ZodRequest<{ params: GetMeetingEnrollmentParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params

    const { enrollment } = await this.useCase.execute({ publicId })

    const formattedReply = MeetingEnrollmentDetailedWithPresentationPresenter.toHTTP(enrollment)

    return await reply.sendResponse(formattedReply)
  }
}
