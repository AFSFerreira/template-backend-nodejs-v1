import type { UpdateUserPermissionsBodySchemaType } from '@custom-types/http/schemas/user/update-user-permissions-body-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { updateUserPermissionsBodySchema } from '@http/schemas/user/update-user-permissions-body-schema'
import { updateUserPermissionsParamsSchema } from '@http/schemas/user/update-user-permissions-params-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { UpdateUserPermissionsUseCase } from '@use-cases/user/update-user-permissions'
import { getClientIp } from '@utils/http/get-client-ip'
import { container } from 'tsyringe'

export async function updateUserPermissions(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateUserPermissionsParamsSchema.parse(request.params)
  const parsedBody = updateUserPermissionsBodySchema.parse(request.body) as UpdateUserPermissionsBodySchemaType

  const useCase = container.resolve(UpdateUserPermissionsUseCase)

  await useCase.execute({
    publicId,
    data: parsedBody,
    audit: {
      actorPublicId: getRequestUserPublicId(request),
      ipAddress: getClientIp(request),
    },
  })

  return await reply.status(204).send()
}
