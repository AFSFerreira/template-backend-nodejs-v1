import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteMeetingParamsType } from '@custom-types/http/schemas/meeting/delete-meeting-params-schema'
import type { FastifyReply } from 'fastify'
import { DeleteMeetingUseCase } from '@use-cases/meeting/delete-meeting'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function deleteMeeting(request: ZodRequest<{ params: DeleteMeetingParamsType }>, reply: FastifyReply) {
  const { publicId } = request.params

  const useCase = container.resolve(DeleteMeetingUseCase)

  await useCase.execute({ publicId })

  return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
}
