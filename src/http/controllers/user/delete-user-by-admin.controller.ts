import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteUserByAdminParamsSchema } from '@schemas/user/delete-user-by-admin-params-schema'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { DeleteUserByAdminUseCase } from '@use-cases/user/delete-user-by-admin'
import { container } from 'tsyringe'

export async function deleteUserByAdmin(request: FastifyRequest, reply: FastifyReply) {
  const adminPublicId = modelPublicIdSchema.parse(request.user.sub)
  const { publicId } = deleteUserByAdminParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteUserByAdminUseCase)

  await useCase.execute({
    adminPublicId,
    targetUserPublicId: publicId,
  })

  return await reply.status(204).send()
}
