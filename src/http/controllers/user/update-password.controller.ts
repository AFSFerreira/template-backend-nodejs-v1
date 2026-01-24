import type { FastifyReply, FastifyRequest } from 'fastify'
import { PASSWORD_UPDATED_SUCCESSFULLY } from '@messages/responses/user-responses.ts/2xx'
import { updatePasswordBodySchema } from '@schemas/user/update-password-body-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { UpdatePasswordUseCase } from '@use-cases/user/update-password'
import { container } from 'tsyringe'

export async function updatePassword(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = updatePasswordBodySchema.parse(request.body)
  const userPublicId = getRequestUserPublicId(request)

  const useCase = container.resolve(UpdatePasswordUseCase)

  await useCase.execute({
    ...parsedBody,
    userPublicId,
  })

  await reply.status(PASSWORD_UPDATED_SUCCESSFULLY.status).send({ data: PASSWORD_UPDATED_SUCCESSFULLY.body })
}
