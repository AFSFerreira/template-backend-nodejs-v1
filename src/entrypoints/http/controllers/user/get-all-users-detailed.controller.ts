import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllUsersDetailedQueryType } from '@custom-types/http/schemas/user/get-all-users-detailed-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserSimplifiedPresenterForAdmin } from '@http/presenters/user/user-simplified-for-admin.presenter'
import { GetAllUsersDetailedUseCase } from '@use-cases/user/get-all-users-detailed'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllUsersDetailedController implements IController {
  constructor(
    @inject(GetAllUsersDetailedUseCase)
    private readonly useCase: GetAllUsersDetailedUseCase,

    @inject(UserSimplifiedPresenterForAdmin)
    private readonly userSimplifiedPresenterForAdmin: UserSimplifiedPresenterForAdmin,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllUsersDetailedQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = this.userSimplifiedPresenterForAdmin.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
