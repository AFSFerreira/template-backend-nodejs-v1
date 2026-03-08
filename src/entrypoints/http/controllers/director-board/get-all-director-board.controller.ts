import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  DirectorBoardDefaultPresenterInput,
  HTTPDirectorBoard,
} from '@custom-types/http/presenter/director-board/director-board-default'
import type { GetAllDirectorBoardType } from '@custom-types/http/schemas/director-board/get-all-director-board-query-schema'
import type { FastifyReply } from 'fastify'
import { DirectorBoardPresenter } from '@http/presenters/director-board-presenter'
import { GetAllDirectorsBoard } from '@use-cases/director-board/get-all-directors-board'
import { container } from 'tsyringe'

export async function getAllDirectorsBoard(
  request: ZodRequest<{ querystring: GetAllDirectorBoardType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllDirectorsBoard)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = DirectorBoardPresenter.toHTTP<DirectorBoardDefaultPresenterInput, HTTPDirectorBoard>(data)

  return await reply.sendPaginated(formattedReply, meta)
}
