import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { DeleteUserUseCase } from '@use-cases/user/delete-user'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(request.user.sub)

  const useCase = container.resolve(DeleteUserUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
