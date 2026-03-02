import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteDirectorBoardParamsSchema } from '@http/schemas/director-board/delete-director-board-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { DeleteDirectorBoardUseCase } from '@use-cases/director-board/delete-director-board'
import { getClientIp } from '@utils/http/get-client-ip'
import { container } from 'tsyringe'

export async function deleteDirectorBoard(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = deleteDirectorBoardParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteDirectorBoardUseCase)

  await useCase.execute({
    publicId,
    audit: {
      actorPublicId: getRequestUserPublicId(request),
      ipAddress: getClientIp(request),
    },
  })

  return await reply.status(204).send()
}
