import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteMeetingEnrollmentParamsSchema } from '@schemas/meeting-enrollment/delete-meeting-enrollment-params-schema'
import { DeleteMeetingEnrollmentUseCase } from '@use-cases/meeting-enrollment/delete-meeting-enrollment'
import { container } from 'tsyringe'

export async function deleteMeetingEnrollment(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = deleteMeetingEnrollmentParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteMeetingEnrollmentUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
