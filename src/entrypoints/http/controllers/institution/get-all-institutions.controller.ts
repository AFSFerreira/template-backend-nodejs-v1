import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllInstitutionsQueryType } from '@custom-types/http/schemas/institution/get-all-institutions-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { GetAllInstitutionsNamesUseCase } from '@use-cases/institution/get-all-institutions-names'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllInstitutionsNamesController implements IController {
  constructor(
    @inject(GetAllInstitutionsNamesUseCase)
    private readonly useCase: GetAllInstitutionsNamesUseCase,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllInstitutionsQueryType }>, reply: FastifyReply) {
    const { data, meta } = await this.useCase.execute(request.query)

    return await reply.sendPaginated(data, meta)
  }
}
