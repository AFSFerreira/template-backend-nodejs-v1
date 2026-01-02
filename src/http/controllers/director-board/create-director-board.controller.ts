import type { FastifyReply, FastifyRequest } from 'fastify'
import { DirectorBoardPresenter } from '@presenters/variants/director-board-presenter'
import { createDirectorBoardBodySchema } from '@schemas/director-board/create-director-board-body-schema'
import { CreateDirectorBoardUseCase } from '@use-cases/director-board/create-director-board'
import { container } from 'tsyringe'

export async function createDirectorBoard(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = createDirectorBoardBodySchema.parse(request.body)

  const useCase = container.resolve(CreateDirectorBoardUseCase)

  const { directorBoard } = await useCase.execute(parsedBody)

  const formattedReply = DirectorBoardPresenter.toHTTP(directorBoard)

  return await reply.status(201).send({ data: formattedReply })
}
