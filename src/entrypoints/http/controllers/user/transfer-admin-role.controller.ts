import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { TransferAdminRoleBodyType } from '@custom-types/http/schemas/user/transfer-admin-role-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { TransferAdminRoleUseCase } from '@use-cases/user/transfer-admin-role'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class TransferAdminRoleController implements IController {
  constructor(
    @inject(TransferAdminRoleUseCase)
    private readonly useCase: TransferAdminRoleUseCase,
  ) {}

  async handle(request: ZodRequest<{ body: TransferAdminRoleBodyType }>, reply: FastifyReply) {
    const currentAdminPublicId = getRequestUserPublicId(request)
    const { newAdminPublicId } = request.body
    await this.useCase.execute({
      currentAdminPublicId,
      newAdminPublicId,
      audit: {
        actorPublicId: currentAdminPublicId,
        ipAddress: getClientIp(request),
      },
    })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
