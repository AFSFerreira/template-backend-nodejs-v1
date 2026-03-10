import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CheckAvailabilityQueryType } from '@custom-types/http/schemas/user/check-availability-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { CheckAvailabilityUseCase } from '@use-cases/user/check-availability'
import type { FastifyReply } from 'fastify'
import { injectable } from 'tsyringe'

@injectable()
export class CheckAvailabilityController implements IController {
  constructor(private useCase: CheckAvailabilityUseCase) {}

  async handle(request: ZodRequest<{ querystring: CheckAvailabilityQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { availabilities } = await this.useCase.execute(parsedQuery)

    return await reply.sendResponse(availabilities)
  }
}
