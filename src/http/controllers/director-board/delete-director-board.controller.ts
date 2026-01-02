import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteDirectorBoardParamsSchema } from '@schemas/director-board/delete-director-board-params-schema'
import { DeleteDirectorBoardUseCase } from '@use-cases/director-board/delete-director-board'
import { container } from 'tsyringe'

export async function deleteDirectorBoard(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = deleteDirectorBoardParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteDirectorBoardUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
