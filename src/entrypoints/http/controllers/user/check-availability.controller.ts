import type { FastifyReply, FastifyRequest } from 'fastify'
import { checkAvailabilityQuerySchema } from '@schemas/user/check-availability-query-schema'
import { CheckAvailabilityUseCase } from '@use-cases/user/check-availability'
import { container } from 'tsyringe'

export async function checkAvailability(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = checkAvailabilityQuerySchema.parse(request.query)

  const useCase = container.resolve(CheckAvailabilityUseCase)

  const { availabilities } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({ data: availabilities })
}
