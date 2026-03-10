import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindUserByIdParamsType } from '@custom-types/http/schemas/user/find-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FindMeetingByPublicIdUseCase } from '@use-cases/meeting/find-by-public-id'
import type { FastifyReply } from 'fastify'
import { MeetingDefaultPresenter } from '@http/presenters/meeting/meeting-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class FindMeetingByPublicIdController implements IController {
  constructor(private useCase: FindMeetingByPublicIdUseCase) {}

  async handle(request: ZodRequest<{ params: FindUserByIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { meeting } = await this.useCase.execute({ publicId })

    const formattedReply = MeetingDefaultPresenter.toHTTP(meeting)

    return await reply.sendResponse(formattedReply)
  }
}
