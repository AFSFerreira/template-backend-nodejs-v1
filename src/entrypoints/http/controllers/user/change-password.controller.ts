import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdatePasswordBodyType } from '@custom-types/http/schemas/user/update-password-body-schema'
import type { FastifyReply } from 'fastify'
import { PASSWORD_UPDATED_SUCCESSFULLY } from '@messages/responses/user-responses/2xx'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { ChangePasswordUseCase } from '@use-cases/user/change-password'
import { container } from 'tsyringe'

export async function changePassword(request: ZodRequest<{ body: UpdatePasswordBodyType }>, reply: FastifyReply) {
  const parsedBody = request.body
  const userPublicId = getRequestUserPublicId(request)

  const useCase = container.resolve(ChangePasswordUseCase)

  await useCase.execute({
    ...parsedBody,
    userPublicId,
  })

  await reply.sendApiResponse(PASSWORD_UPDATED_SUCCESSFULLY)
}
