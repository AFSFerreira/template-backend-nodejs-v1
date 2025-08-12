import type { FastifyReply, FastifyRequest } from 'fastify'
import { checkUsernameAvailabilitySchema } from '@/http/schemas/user/check-username-availability-schema'
import { makeCheckUsernameAvailabilityUseCase } from '@/use-cases/user/check-username-availability-factory'

export async function checkUsernameAvailability(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { username } = checkUsernameAvailabilitySchema.parse(request.params)
  const checkUsernameAvailabilityUseCase =
    makeCheckUsernameAvailabilityUseCase()

  const result = await checkUsernameAvailabilityUseCase.execute({ username })

  return await reply.status(200).send({ available: result.available })
}
