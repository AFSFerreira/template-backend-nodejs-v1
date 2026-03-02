import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteUserByAdminParamsSchema } from '@http/schemas/user/delete-user-by-admin-params-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { DeleteUserByAdminUseCase } from '@use-cases/user/delete-user-by-admin'
import { getClientIp } from '@utils/http/get-client-ip'
import { container } from 'tsyringe'

export async function deleteUserByAdmin(request: FastifyRequest, reply: FastifyReply) {
  const adminPublicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
  const { publicId } = deleteUserByAdminParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteUserByAdminUseCase)

  await useCase.execute({
    adminPublicId,
    targetUserPublicId: publicId,
    audit: {
      actorPublicId: adminPublicId,
      ipAddress: getClientIp(request),
    },
  })

  return await reply.status(204).send()
}
