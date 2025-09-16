import { checkAvailabilityQuerySchema } from '@schemas/user/check-availability-query-schema'
import { makeCheckAvailabilityUseCase } from '@use-cases/factories/user/make-check-availability-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function checkAvailability(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = checkAvailabilityQuerySchema.parse(request.query)
  const checkEmailAvailabilityUseCase = makeCheckAvailabilityUseCase()

  const { availabilities } = await checkEmailAvailabilityUseCase.execute(parsedQuery)

  return await reply.status(200).send({ data: availabilities })
}
