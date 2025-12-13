import type { FastifyReply, FastifyRequest } from 'fastify'
import { transferAdminRoleBodySchema } from '@schemas/user/transfer-admin-role-body-schema'
import { getRequestUserId } from '@services/http/get-request-user-id'
import { TransferAdminRoleUseCase } from '@use-cases/user/transfer-admin-role'
import { container } from 'tsyringe'

export async function transferAdminRole(request: FastifyRequest, reply: FastifyReply) {
  const currentAdminPublicId = getRequestUserId(request)
  const { newAdminPublicId } = transferAdminRoleBodySchema.parse(request.body)

  const useCase = container.resolve(TransferAdminRoleUseCase)

  await useCase.execute({
    currentAdminPublicId,
    newAdminPublicId,
  })

  return await reply.status(204).send()
}
