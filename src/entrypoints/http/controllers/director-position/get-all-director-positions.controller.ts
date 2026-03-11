import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllDirectorPositionsType } from '@custom-types/http/schemas/director-position/get-all-director-positions-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DirectorPositionDefaultPresenter } from '@http/presenters/director-position/director-position-default.presenter'
import { GetAllDirectorPositionsUseCase } from '@use-cases/director-position/get-all-director-positions'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllDirectorPositionsController implements IController {
  constructor(
    @inject(GetAllDirectorPositionsUseCase)
    private readonly useCase: GetAllDirectorPositionsUseCase,

    @inject(DirectorPositionDefaultPresenter)
    private readonly directorPositionDefaultPresenter: DirectorPositionDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllDirectorPositionsType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = this.directorPositionDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
