import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteMeetingParamsSchema } from '@http/schemas/meeting/delete-meeting-params-schema'
import { DeleteMeetingUseCase } from '@use-cases/meeting/delete-meeting'
import { container } from 'tsyringe'

export async function deleteMeeting(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = deleteMeetingParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteMeetingUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
