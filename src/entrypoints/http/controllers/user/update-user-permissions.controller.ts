import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  UpdateUserPermissionsBodySchemaType,
  UpdateUserPermissionsBodyType,
} from '@custom-types/http/schemas/user/update-user-permissions-body-schema'
import type { UpdateUserPermissionsParamsType } from '@custom-types/http/schemas/user/update-user-permissions-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UpdateUserPermissionsUseCase } from '@use-cases/user/update-user-permissions'
import type { FastifyReply } from 'fastify'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class UpdateUserPermissionsController implements IController {
  constructor(private useCase: UpdateUserPermissionsUseCase) {}

  async handle(
    request: ZodRequest<{ body: UpdateUserPermissionsBodyType; params: UpdateUserPermissionsParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const parsedBody = request.body as UpdateUserPermissionsBodySchemaType
    await this.useCase.execute({
      publicId,
      data: parsedBody,
      audit: {
        actorPublicId: getRequestUserPublicId(request),
        ipAddress: getClientIp(request),
      },
    })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
