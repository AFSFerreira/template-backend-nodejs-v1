import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteDirectorBoardParamsType } from '@custom-types/http/schemas/director-board/delete-director-board-params-schema'
import type { FastifyReply } from 'fastify'
import { DeleteDirectorBoardUseCase } from '@use-cases/director-board/delete-director-board'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function deleteDirectorBoard(
  request: ZodRequest<{ params: DeleteDirectorBoardParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(DeleteDirectorBoardUseCase)

  await useCase.execute({
    publicId,
    audit: {
      actorPublicId: getRequestUserPublicId(request),
      ipAddress: getClientIp(request),
    },
  })

  return await reply.status(StatusCodes.NO_CONTENT).send()
}
