import type { UpdateUserPermissionsBodySchemaType } from '@custom-types/schemas/user/update-user-permissions-body-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { updateUserPermissionsBodySchema } from '@schemas/user/update-user-permissions-body-schema'
import { updateUserPermissionsParamsSchema } from '@schemas/user/update-user-permissions-params-schema'
import { UpdateUserPermissionsUseCase } from '@use-cases/user/update-user-permissions'
import { container } from 'tsyringe'

export async function updateUserPermissions(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateUserPermissionsParamsSchema.parse(request.params)
  const parsedBody = updateUserPermissionsBodySchema.parse(request.body) as UpdateUserPermissionsBodySchemaType

  const useCase = container.resolve(UpdateUserPermissionsUseCase)

  await useCase.execute({ publicId, data: parsedBody })

  return await reply.status(204).send()
}
