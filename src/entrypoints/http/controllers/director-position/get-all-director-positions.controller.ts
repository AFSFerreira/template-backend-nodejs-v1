import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllDirectorPositionsType } from '@custom-types/http/schemas/director-position/get-all-director-positions-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllDirectorPositionsUseCase } from '@use-cases/director-position/get-all-director-positions'
import type { FastifyReply } from 'fastify'
import { DirectorPositionDefaultPresenter } from '@http/presenters/director-position/director-position-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllDirectorPositionsController implements IController {
  constructor(private useCase: GetAllDirectorPositionsUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllDirectorPositionsType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = DirectorPositionDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
