import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateMeetingBodyType } from '@custom-types/http/schemas/meeting/update-meeting-body-schema'
import type { UpdateMeetingParamsType } from '@custom-types/http/schemas/meeting/update-meeting-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UpdateMeetingUseCase } from '@use-cases/meeting/update-meeting'
import type { FastifyReply } from 'fastify'
import { MeetingDefaultPresenter } from '@http/presenters/meeting/meeting-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class UpdateMeetingController implements IController {
  constructor(private useCase: UpdateMeetingUseCase) {}

  async handle(
    request: ZodRequest<{ body: UpdateMeetingBodyType; params: UpdateMeetingParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const parsedBody = request.body
    const { meeting } = await this.useCase.execute({
      publicId,
      body: parsedBody,
    })

    const formattedReply = MeetingDefaultPresenter.toHTTP(meeting)

    return await reply.sendResponse(formattedReply)
  }
}
