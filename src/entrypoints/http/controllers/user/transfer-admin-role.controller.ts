import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { TransferAdminRoleBodyType } from '@custom-types/http/schemas/user/transfer-admin-role-body-schema'
import type { FastifyReply } from 'fastify'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { TransferAdminRoleUseCase } from '@use-cases/user/transfer-admin-role'
import { getClientIp } from '@utils/http/get-client-ip'
import { container } from 'tsyringe'

export async function transferAdminRole(request: ZodRequest<{ body: TransferAdminRoleBodyType }>, reply: FastifyReply) {
  const currentAdminPublicId = getRequestUserPublicId(request)
  const { newAdminPublicId } = request.body

  const useCase = container.resolve(TransferAdminRoleUseCase)

  await useCase.execute({
    currentAdminPublicId,
    newAdminPublicId,
    audit: {
      actorPublicId: currentAdminPublicId,
      ipAddress: getClientIp(request),
    },
  })

  return await reply.status(204).send()
}
