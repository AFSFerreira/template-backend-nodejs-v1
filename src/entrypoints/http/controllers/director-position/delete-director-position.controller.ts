import type { FastifyReply, FastifyRequest } from 'fastify'
import { updateDirectorPositionParamsSchema } from '@http/schemas/director-position/update-director-position-params-schema'
import { DeleteDirectorPositionUseCase } from '@use-cases/director-position/delete-director-position'
import { container } from 'tsyringe'

export async function deleteDirectorPosition(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateDirectorPositionParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteDirectorPositionUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
