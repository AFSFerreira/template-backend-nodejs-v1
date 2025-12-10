import type { HTTPDirectorBoardWithUser } from '@custom-types/presenter/director-board/director-board-with-user'
import type { DirectorBoardWithUser } from '@custom-types/validator/director-board-with-user'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DIRECTOR_BOARD_WITH_USER_PRESENTER_KEY } from '@constants/presenters-constants'
import { DirectorBoardPresenter } from '@presenters/variants/director-board-presenter'
import { getAllDirectorBoardSchema } from '@schemas/director-board/get-all-director-board-query-schema'
import { GetAllDirectorsBoard } from '@use-cases/director-board/get-all-directors-board'
import { container } from 'tsyringe'

export async function getAllDirectorsBoard(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllDirectorBoardSchema.parse(request.query)

  const useCase = container.resolve(GetAllDirectorsBoard)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: DirectorBoardPresenter.toHTTP<DirectorBoardWithUser, HTTPDirectorBoardWithUser>(
      data,
      DIRECTOR_BOARD_WITH_USER_PRESENTER_KEY,
    ),
    meta,
  })
}
