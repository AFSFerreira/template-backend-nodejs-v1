import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllMeetingsQueryType } from '@custom-types/http/schemas/meeting/get-all-meetings-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllMeetingsUseCase } from '@use-cases/meeting/get-all-meetings'
import type { FastifyReply } from 'fastify'
import { MeetingDefaultPresenter } from '@http/presenters/meeting/meeting-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllMeetingsController implements IController {
  constructor(private useCase: GetAllMeetingsUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllMeetingsQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = MeetingDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
