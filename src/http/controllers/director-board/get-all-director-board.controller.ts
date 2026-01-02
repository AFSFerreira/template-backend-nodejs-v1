import type {
  DirectorBoardDefaultPresenterInput,
  HTTPDirectorBoard,
} from '@custom-types/presenter/director-board/director-board-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DirectorBoardPresenter } from '@presenters/variants/director-board-presenter'
import { getAllDirectorBoardSchema } from '@schemas/director-board/get-all-director-board-query-schema'
import { GetAllDirectorsBoard } from '@use-cases/director-board/get-all-directors-board'
import { container } from 'tsyringe'

export async function getAllDirectorsBoard(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllDirectorBoardSchema.parse(request.query)

  const useCase = container.resolve(GetAllDirectorsBoard)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = DirectorBoardPresenter.toHTTP<DirectorBoardDefaultPresenterInput, HTTPDirectorBoard>(data)

  return await reply.status(200).send({ data: formattedReply, meta })
}
