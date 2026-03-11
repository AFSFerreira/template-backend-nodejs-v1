import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteUserByAdminParamsType } from '@custom-types/http/schemas/user/delete-user-by-admin-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { DeleteUserByAdminUseCase } from '@use-cases/user/delete-user-by-admin'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteUserByAdminController implements IController {
  constructor(
    @inject(DeleteUserByAdminUseCase)
    private readonly useCase: DeleteUserByAdminUseCase,
  ) {}

  async handle(request: ZodRequest<{ params: DeleteUserByAdminParamsType }>, reply: FastifyReply) {
    const adminPublicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
    const { publicId } = request.params
    await this.useCase.execute({
      adminPublicId,
      targetUserPublicId: publicId,
      audit: {
        actorPublicId: adminPublicId,
        ipAddress: getClientIp(request),
      },
    })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
