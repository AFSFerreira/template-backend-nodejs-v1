import { DIRECTOR_BOARD_WITH_USER_PRESENTER_KEY } from '@constants/presenters-constants'
import { DirectorBoardPresenter } from '@presenters/director-board-presenter'
import { getAllDirectorBoardSchema } from '@schemas/director-board/get-all-director-board-query-schema'
import { makeGetAllDirectorBoardUseCase } from '@use-cases/factories/director-board/make-get-all-directive-corp-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllDirectorBoard(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllDirectorBoardSchema.parse(request.query)
  const useCase = makeGetAllDirectorBoardUseCase()

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply
    .status(200)
    .send({ data: DirectorBoardPresenter.toHTTP(data, DIRECTOR_BOARD_WITH_USER_PRESENTER_KEY), meta })
}
