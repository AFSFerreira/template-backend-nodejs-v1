import { DirectorBoardPresenter } from '@presenters/director-board-presenter'
import { getAllDirectorBoardSchema } from '@schemas/director-board/get-all-director-board-query-schema'
import { makeGetAllDirectorBoardUseCase } from '@use-cases/factories/directive-corp/make-get-all-directive-corp-use-case'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function getAllDirectorBoard(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllDirectorBoardSchema.parse(request.query)
  const getAllDirectorBoardUseCase = makeGetAllDirectorBoardUseCase()

  const { data, meta } = await getAllDirectorBoardUseCase.execute(parsedQuery)

  return await reply.status(200).send({ data: DirectorBoardPresenter.toHTTPSimplified(data), meta })
}
