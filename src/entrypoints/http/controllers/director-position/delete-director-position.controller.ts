import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteDirectorPositionParamsType } from '@custom-types/http/schemas/director-position/delete-director-position-params-schema'
import type { FastifyReply } from 'fastify'
import { DeleteDirectorPositionUseCase } from '@use-cases/director-position/delete-director-position'
import { container } from 'tsyringe'

export async function deleteDirectorPosition(
  request: ZodRequest<{ params: DeleteDirectorPositionParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(DeleteDirectorPositionUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
