import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllUsersSimplifiedQueryType } from '@custom-types/http/schemas/user/get-all-users-simplified-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllUsersSimplifiedUseCase } from '@use-cases/user/get-all-users-simplified'
import type { FastifyReply } from 'fastify'
import { UserSimplifiedPresenter } from '@http/presenters/user/user-simplified.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllUsersSimplifiedController implements IController {
  constructor(private useCase: GetAllUsersSimplifiedUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllUsersSimplifiedQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = UserSimplifiedPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
