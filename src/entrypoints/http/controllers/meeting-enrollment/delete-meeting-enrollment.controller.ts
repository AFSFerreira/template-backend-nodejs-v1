import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteMeetingEnrollmentParamsType } from '@custom-types/http/schemas/meeting-enrollment/delete-meeting-enrollment-params-schema'
import type { FastifyReply } from 'fastify'
import { DeleteMeetingEnrollmentUseCase } from '@use-cases/meeting-enrollment/delete-meeting-enrollment'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function deleteMeetingEnrollment(
  request: ZodRequest<{ params: DeleteMeetingEnrollmentParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(DeleteMeetingEnrollmentUseCase)

  await useCase.execute({ publicId })

  return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
}
