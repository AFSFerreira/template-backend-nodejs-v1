import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CheckAvailabilityQueryType } from '@custom-types/http/schemas/user/check-availability-query-schema'
import type { FastifyReply } from 'fastify'
import { CheckAvailabilityUseCase } from '@use-cases/user/check-availability'
import { container } from 'tsyringe'

export async function checkAvailability(
  request: ZodRequest<{ querystring: CheckAvailabilityQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(CheckAvailabilityUseCase)

  const { availabilities } = await useCase.execute(parsedQuery)

  return await reply.sendResponse(availabilities)
}
