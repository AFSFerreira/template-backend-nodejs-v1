import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllInstitutionsWithUsersQueryType } from '@custom-types/http/schemas/institution/get-all-institutions-with-users-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { InstitutionWithUsersCountPresenter } from '@http/presenters/institution/institution-with-users-count.presenter'
import { GetAllInstitutionsWithUsersUseCase } from '@use-cases/institution/get-all-institutions-with-user'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllInstitutionsWithUsersController implements IController {
  constructor(
    @inject(GetAllInstitutionsWithUsersUseCase)
    private readonly useCase: GetAllInstitutionsWithUsersUseCase,

    @inject(InstitutionWithUsersCountPresenter)
    private readonly institutionWithUsersCountPresenter: InstitutionWithUsersCountPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllInstitutionsWithUsersQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = this.institutionWithUsersCountPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
