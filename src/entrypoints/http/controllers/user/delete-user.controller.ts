import type { FastifyReply, FastifyRequest } from 'fastify'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { DeleteUserUseCase } from '@use-cases/user/delete-user'
import { container } from 'tsyringe'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))

  const useCase = container.resolve(DeleteUserUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
