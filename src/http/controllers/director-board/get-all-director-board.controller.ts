import type {
  HTTPDirectorBoardWithUser,
} from '@custom-types/presenter/director-board/director-board-with-user'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { DirectorBoardPresenter } from '@presenters/variants/director-board-presenter'
import { getAllDirectorBoardSchema } from '@schemas/director-board/get-all-director-board-query-schema'
import { GetAllDirectorsBoard } from '@use-cases/director-board/get-all-directors-board'
import { container } from 'tsyringe'
import type { DirectorBoardWithUser } from '@custom-types/validators/director-board-with-user'

export async function getAllDirectorsBoard(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllDirectorBoardSchema.parse(request.query)

  const useCase = container.resolve(GetAllDirectorsBoard)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = DirectorBoardPresenter.toHTTP<DirectorBoardWithUser, HTTPDirectorBoardWithUser>(
    data,
    tokens.presenters.directorBoardWithUser,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
