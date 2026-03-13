import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllDirectorBoardType } from '@custom-types/http/schemas/director-board/get-all-director-board-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DirectorBoardDefaultPresenter } from '@http/presenters/director-board/director-board-default.presenter'
import { GetAllDirectorsBoard } from '@use-cases/director-board/get-all-directors-board'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllDirectorsBoardController implements IController {
  constructor(
    @inject(GetAllDirectorsBoard)
    private readonly useCase: GetAllDirectorsBoard,

    @inject(DirectorBoardDefaultPresenter)
    private readonly directorBoardDefaultPresenter: DirectorBoardDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllDirectorBoardType }>, reply: FastifyReply) {
    const { data, meta } = await this.useCase.execute(request.query)

    const formattedReply = this.directorBoardDefaultPresenter.toHTTP(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
