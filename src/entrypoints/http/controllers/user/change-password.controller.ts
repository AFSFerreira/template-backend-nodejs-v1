import type { FastifyReply, FastifyRequest } from 'fastify'
import { changePasswordBodySchema } from '@http/schemas/user/update-password-body-schema'
import { PASSWORD_UPDATED_SUCCESSFULLY } from '@messages/responses/user-responses/2xx'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { ChangePasswordUseCase } from '@use-cases/user/change-password'
import { container } from 'tsyringe'

export async function changePassword(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = changePasswordBodySchema.parse(request.body)
  const userPublicId = getRequestUserPublicId(request)

  const useCase = container.resolve(ChangePasswordUseCase)

  await useCase.execute({
    ...parsedBody,
    userPublicId,
  })

  await reply.status(PASSWORD_UPDATED_SUCCESSFULLY.status).send({ data: PASSWORD_UPDATED_SUCCESSFULLY.body })
}
