import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllDirectorBoardType } from '@custom-types/http/schemas/director-board/get-all-director-board-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllDirectorsBoard } from '@use-cases/director-board/get-all-directors-board'
import type { FastifyReply } from 'fastify'
import { DirectorBoardDefaultPresenter } from '@http/presenters/director-board/director-board-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllDirectorsBoardController implements IController {
  constructor(private useCase: GetAllDirectorsBoard) {}

  async handle(request: ZodRequest<{ querystring: GetAllDirectorBoardType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = DirectorBoardDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
