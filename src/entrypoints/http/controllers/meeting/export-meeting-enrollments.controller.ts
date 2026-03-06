import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ExportMeetingEnrollmentsParamsType } from '@custom-types/http/schemas/meeting/export-meeting-enrollments-params-schema'
import type { ExportMeetingEnrollmentsQueryType } from '@custom-types/http/schemas/meeting/export-meeting-enrollments-query-schema'
import type { FastifyReply } from 'fastify'
import { ExportMeetingEnrollmentsUseCase } from '@use-cases/meeting-enrollment/export-meeting-enrollments'
import { container } from 'tsyringe'

export async function exportMeetingEnrollments(
  request: ZodRequest<{ params: ExportMeetingEnrollmentsParamsType; querystring: ExportMeetingEnrollmentsQueryType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params
  const { format } = request.query

  const useCase = container.resolve(ExportMeetingEnrollmentsUseCase)

  const { reportStream, filename, contentTypeHeader } = await useCase.execute({
    meetingPublicId: publicId,
    format,
  })

  return await reply
    .header(contentTypeHeader.key, contentTypeHeader.value)
    .header('Content-Disposition', `attachment; filename="${filename}"`)
    .send(reportStream)
}
