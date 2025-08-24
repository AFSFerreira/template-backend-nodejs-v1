import { checkEmailAvailabilityBodySchema } from '@schemas/user/check-email-availability-body-schema'
import { makeCheckEmailAvailabilityUseCase } from '@use-cases/user/check-email-availability-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function checkEmailAvailability(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email } = checkEmailAvailabilityBodySchema.parse(request.params)
  const checkEmailAvailabilityUseCase = makeCheckEmailAvailabilityUseCase()

  const result = await checkEmailAvailabilityUseCase.execute({ email })

  return await reply.status(200).send({ available: result.available })
}
