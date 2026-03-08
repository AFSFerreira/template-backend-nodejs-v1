import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  UpdateUserPermissionsBodySchemaType,
  UpdateUserPermissionsBodyType,
} from '@custom-types/http/schemas/user/update-user-permissions-body-schema'
import type { UpdateUserPermissionsParamsType } from '@custom-types/http/schemas/user/update-user-permissions-params-schema'
import type { FastifyReply } from 'fastify'
import { UpdateUserPermissionsUseCase } from '@use-cases/user/update-user-permissions'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function updateUserPermissions(
  request: ZodRequest<{ body: UpdateUserPermissionsBodyType; params: UpdateUserPermissionsParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params
  const parsedBody = request.body as UpdateUserPermissionsBodySchemaType

  const useCase = container.resolve(UpdateUserPermissionsUseCase)

  await useCase.execute({
    publicId,
    data: parsedBody,
    audit: {
      actorPublicId: getRequestUserPublicId(request),
      ipAddress: getClientIp(request),
    },
  })

  return await reply.status(StatusCodes.NO_CONTENT).send()
}
