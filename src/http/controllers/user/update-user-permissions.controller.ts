import type { UpdateUserPermissionsBodySchemaType } from '@custom-types/schemas/user/update-user-permissions-body-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { updateUserPermissionsBodySchema } from '@schemas/user/update-user-permissions-body-schema'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { UpdateUserPermissionsUseCase } from '@use-cases/user/update-user-permissions'
import { container } from 'tsyringe'
import z from 'zod'

export async function updateUserPermissions(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = z.object({ publicId: modelPublicIdSchema }).parse(request.params)
  const parsedBody = updateUserPermissionsBodySchema.parse(request.body) as UpdateUserPermissionsBodySchemaType

  const useCase = container.resolve(UpdateUserPermissionsUseCase)

  await useCase.execute({ publicId, data: parsedBody })

  return await reply.status(204).send()
}
