import { deleteUserByAdminParamsSchema } from '@schemas/user/delete-user-by-admin-params-schema'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { makeDeleteUserByAdminUseCase } from '@use-cases/factories/user/make-delete-user-by-admin-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteUserByAdmin(request: FastifyRequest, reply: FastifyReply) {
  const adminPublicId = modelPublicIdSchema.parse(request.user.sub)
  const { publicId } = deleteUserByAdminParamsSchema.parse(request.params)

  const useCase = makeDeleteUserByAdminUseCase()

  await useCase.execute({
    adminPublicId,
    targetUserPublicId: publicId,
  })

  return await reply.status(204).send()
}
