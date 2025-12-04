import { makeDeleteUserUseCase } from '@factories/user/make-delete-user-account-use-case'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const publicId = modelPublicIdSchema.parse(request.user.sub)

  const useCase = makeDeleteUserUseCase()

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
