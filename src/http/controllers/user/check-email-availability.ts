import type { FastifyReply, FastifyRequest } from 'fastify'
import { checkEmailAvailabilitySchema } from '@/http/schemas/user/check-email-availability-schema'
import { makeCheckEmailAvailabilityUseCase } from '@/use-cases/user/check-email-availability-factory'

export async function checkEmailAvailability(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email } = checkEmailAvailabilitySchema.parse(request.params)
  const checkEmailAvailabilityUseCase = makeCheckEmailAvailabilityUseCase()

  const result = await checkEmailAvailabilityUseCase.execute({ email })

  return await reply.status(200).send({ available: result.available })
}
