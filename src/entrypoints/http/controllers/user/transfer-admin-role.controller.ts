import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { TransferAdminRoleBodyType } from '@custom-types/http/schemas/user/transfer-admin-role-body-schema'
import type { FastifyReply } from 'fastify'
import { TransferAdminRoleUseCase } from '@use-cases/user/transfer-admin-role'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
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

  return await reply.status(StatusCodes.NO_CONTENT).send()
}
